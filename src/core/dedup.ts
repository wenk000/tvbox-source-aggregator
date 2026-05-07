// 去重逻辑

import type { TVBoxSite, TVBoxParse, TVBoxLive, TVBoxDoh, TVBoxRule } from './types';

/**
 * 站点去重
 * 去重键: key + api（所有类型统一，JAR 差异不作为区分维度）
 * 冲突: key 相同但 api 不同 → key 加来源后缀
 */
export function deduplicateSites(sites: TVBoxSite[]): TVBoxSite[] {
  const keyMap = new Map<string, TVBoxSite>(); // key → first site
  const dedupKey = (site: TVBoxSite): string => {
    return `${site.key}|${site.api}`;
  };

  const result: TVBoxSite[] = [];
  const seen = new Set<string>();
  const usedKeys = new Map<string, number>(); // key → count, for suffix

  for (const site of sites) {
    const dk = dedupKey(site);
    if (seen.has(dk)) continue;
    seen.add(dk);

    // 处理 key 冲突：同 key 不同内容
    if (keyMap.has(site.key)) {
      const existing = keyMap.get(site.key)!;
      if (dedupKey(existing) !== dk) {
        // key 冲突，加后缀
        const count = (usedKeys.get(site.key) || 1) + 1;
        usedKeys.set(site.key, count);
        site.key = `${site.key}_${count}`;
        if (site.name) {
          site.name = `${site.name}(${count})`;
        }
      }
    } else {
      keyMap.set(site.key, site);
      usedKeys.set(site.key, 1);
    }

    result.push(site);
  }

  return result;
}

/**
 * 解析器去重 (url + type)
 * 按 url+type 去重而非 name+url，同一 URL 不同 name 视为同一解析
 * 保留 type 维度防止嗅探(0)和 JSON(1)解析被误合并
 */
export function deduplicateParses(parses: TVBoxParse[]): TVBoxParse[] {
  const seen = new Set<string>();
  return parses.filter((parse) => {
    const key = `${parse.url}|${parse.type ?? 0}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * 直播源去重 (url)
 */
export function deduplicateLives(lives: TVBoxLive[]): TVBoxLive[] {
  const seen = new Set<string>();
  return lives.filter((live) => {
    const url = live.url || live.api || '';
    if (!url) return true; // 无 URL 的保留
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
}

/**
 * DOH 去重 (url)
 */
export function deduplicateDoh(dohs: TVBoxDoh[]): TVBoxDoh[] {
  const seen = new Set<string>();
  return dohs.filter((doh) => {
    if (seen.has(doh.url)) return false;
    seen.add(doh.url);
    return true;
  });
}

/**
 * Rules 合并：相同 host/hosts 的规则合并 regex/rule/filter/script
 */
export function mergeRules(rules: TVBoxRule[]): TVBoxRule[] {
  const hostMap = new Map<string, TVBoxRule>();

  for (const rule of rules) {
    const hostKey = rule.host || (rule.hosts || []).sort().join(',');
    if (!hostKey) {
      // 无法归类的规则直接保留
      hostMap.set(`__anon_${hostMap.size}`, rule);
      continue;
    }

    if (hostMap.has(hostKey)) {
      const existing = hostMap.get(hostKey)!;
      if (rule.rule) existing.rule = [...new Set([...(existing.rule || []), ...rule.rule])];
      if (rule.filter) existing.filter = [...new Set([...(existing.filter || []), ...rule.filter])];
      if (rule.regex) existing.regex = [...new Set([...(existing.regex || []), ...rule.regex])];
      if (rule.script) existing.script = [...new Set([...(existing.script || []), ...rule.script])];
    } else {
      hostMap.set(hostKey, { ...rule });
    }
  }

  return [...hostMap.values()];
}

/**
 * Hosts 去重：同 domain 后者覆盖
 */
export function deduplicateHosts(hosts: string[]): string[] {
  const map = new Map<string, string>();
  for (const entry of hosts) {
    const eqIndex = entry.indexOf('=');
    if (eqIndex > 0) {
      const domain = entry.substring(0, eqIndex);
      map.set(domain, entry);
    }
  }
  return [...map.values()];
}

/**
 * 字符串数组去重 (ads, flags)
 */
export function deduplicateStrings(arr: string[]): string[] {
  return [...new Set(arr)];
}

// ─── 相似名称去重 ──────────────────────────────────────────────────────

/**
 * 计算两个字符串的相似度（0~1）
 * 使用"公共子序列长度 / 最长字符串长度"近似算法，避免 O(n²) 的完整 Levenshtein
 */
function nameSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;
  // 转小写 + 去掉常见无意义字符
  const normalize = (s: string) =>
    s.toLowerCase()
      .replace(/[【】\[\]()（）《》「」『』<>\s\-_·•,.，。]/g, '')
      .replace(/\d+/g, ''); // 去掉数字，避免 "新闻1" 和 "新闻2" 被视为不同

  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;
  if (!na || !nb) return 0;

  // 短的在前
  const [short, long] = na.length <= nb.length ? [na, nb] : [nb, na];
  let matches = 0;
  let longIdx = 0;
  for (const ch of short) {
    const found = long.indexOf(ch, longIdx);
    if (found >= 0) {
      matches++;
      longIdx = found + 1;
    }
  }
  return matches / long.length;
}

/**
 * 对站点按名称进行相似度去重，保留响应速度最快的一个
 *
 * 原理：
 * 1. 用 speedMap 获取每个站点的响应速度（ms）
 * 2. 将名称相似度 >= threshold 的站点归为同一组
 * 3. 每组只保留速度最快的一个（若无速度数据，保留第一个）
 *
 * @param sites 待去重的站点数组（已经过基本去重）
 * @param speedMap 测速结果，key = site.api
 * @param threshold 相似度阈值，默认 0.85（0~1，越高要求越严格）
 */
export function deduplicateSimilarNames(
  sites: TVBoxSite[],
  speedMap: Map<string, number>,
  threshold = 0.85,
): TVBoxSite[] {
  if (sites.length === 0) return sites;

  // Union-Find，用于分组
  const parent: number[] = sites.map((_, i) => i);
  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  function union(x: number, y: number) {
    parent[find(x)] = find(y);
  }

  // 两两比较 name 相似度（O(n²)，站点数通常 < 1000，可接受）
  for (let i = 0; i < sites.length; i++) {
    for (let j = i + 1; j < sites.length; j++) {
      const na = sites[i].name || sites[i].key;
      const nb = sites[j].name || sites[j].key;
      if (nameSimilarity(na, nb) >= threshold) {
        union(i, j);
      }
    }
  }

  // 按组收集
  const groups = new Map<number, number[]>(); // root → [indices]
  for (let i = 0; i < sites.length; i++) {
    const root = find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(i);
  }

  const kept: TVBoxSite[] = [];
  let dedupCount = 0;

  for (const [, indices] of groups) {
    if (indices.length === 1) {
      kept.push(sites[indices[0]]);
      continue;
    }

    // 找速度最快的（ms 越小越好）
    let bestIdx = indices[0];
    let bestSpeed = speedMap.get(sites[bestIdx].api) ?? Infinity;

    for (let k = 1; k < indices.length; k++) {
      const idx = indices[k];
      const speed = speedMap.get(sites[idx].api) ?? Infinity;
      if (speed < bestSpeed) {
        bestSpeed = speed;
        bestIdx = idx;
      }
    }

    kept.push(sites[bestIdx]);
    dedupCount += indices.length - 1;

    // 日志：输出被合并的站点信息
    if (indices.length > 1) {
      const names = indices.map(i => `${sites[i].name || sites[i].key}(${speedMap.get(sites[i].api) ?? '?'}ms)`);
      console.log(`[dedup-similar] Group: ${names.join(' | ')} → kept: ${sites[bestIdx].name || sites[bestIdx].key}`);
    }
  }

  if (dedupCount > 0) {
    console.log(`[dedup-similar] Removed ${dedupCount} similar-name duplicates (threshold: ${threshold})`);
  }

  // 保持原始顺序（按 kept 中索引在 sites 中的位置排序）
  const keptKeys = new Set(kept.map(s => s.key));
  return sites.filter(s => keptKeys.has(s.key));
}


