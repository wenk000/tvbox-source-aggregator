// 融合接口源自定义分组排序
// 按频道名称关键词，将匹配的站点分组并调整顺序

import type { Storage } from '../storage/interface';
import type { TVBoxSite } from './types';
import { KV_GROUP_ORDER } from './config';

/**
 * 分组排序规则
 * rules: 按优先级从高到低排列的规则数组
 * 每条规则包含关键词列表（满足任意一个即命中），命中的站点按照 rules 顺序排列
 * unmatched: 未命中的站点放在最前 / 最后
 */
export interface GroupOrderRule {
  /** 规则名称（显示用） */
  name: string;
  /** 关键词列表，站点 name 包含其中任意一个即命中（大小写不敏感） */
  keywords: string[];
}

export interface GroupOrderConfig {
  rules: GroupOrderRule[];
  /** 未匹配站点的位置: 'before' 放最前 | 'after' 放最后（默认 after） */
  unmatchedPosition: 'before' | 'after';
  /** 是否启用 */
  enabled: boolean;
}

export const DEFAULT_GROUP_ORDER_CONFIG: GroupOrderConfig = {
  rules: [],
  unmatchedPosition: 'after',
  enabled: false,
};

export async function loadGroupOrder(storage: Storage): Promise<GroupOrderConfig> {
  const raw = await storage.get(KV_GROUP_ORDER);
  if (!raw) return { ...DEFAULT_GROUP_ORDER_CONFIG };
  try {
    const parsed = JSON.parse(raw) as Partial<GroupOrderConfig>;
    return {
      rules: parsed.rules || [],
      unmatchedPosition: parsed.unmatchedPosition || 'after',
      enabled: parsed.enabled !== false,
    };
  } catch {
    return { ...DEFAULT_GROUP_ORDER_CONFIG };
  }
}

export async function saveGroupOrder(storage: Storage, cfg: GroupOrderConfig): Promise<void> {
  await storage.put(KV_GROUP_ORDER, JSON.stringify(cfg));
}

/**
 * 应用分组排序：按照规则顺序重排 sites 数组
 * 匹配逻辑：关键词同时匹配站点 name 和 key（大小写不敏感）
 */
export function applyGroupOrder(sites: TVBoxSite[], cfg: GroupOrderConfig): TVBoxSite[] {
  if (!cfg.enabled || cfg.rules.length === 0) return sites;

  // 为每个站点找到第一个匹配规则的 index（-1 = 未匹配）
  // 同时匹配 name 和 key，提高命中率
  function getRuleIndex(site: TVBoxSite): number {
    const nameLower = (site.name || '').toLowerCase();
    const keyLower = (site.key || '').toLowerCase();
    for (let i = 0; i < cfg.rules.length; i++) {
      const rule = cfg.rules[i];
      const hit = rule.keywords.some(kw => {
        if (!kw) return false;
        const kl = kw.toLowerCase();
        return nameLower.includes(kl) || keyLower.includes(kl);
      });
      if (hit) return i;
    }
    return -1;
  }

  // 按规则分桶
  const buckets: TVBoxSite[][] = cfg.rules.map(() => []);
  const unmatched: TVBoxSite[] = [];

  for (const site of sites) {
    const idx = getRuleIndex(site);
    if (idx >= 0) {
      buckets[idx].push(site);
    } else {
      unmatched.push(site);
    }
  }

  // 合并：规则桶按顺序，未匹配按配置放前/后
  const ordered: TVBoxSite[] = [];
  const matched = buckets.flat();

  if (cfg.unmatchedPosition === 'before') {
    ordered.push(...unmatched, ...matched);
  } else {
    ordered.push(...matched, ...unmatched);
  }

  // 统计日志
  const matchedCount = matched.length;
  const unmatchedCount = unmatched.length;
  console.log(`[group-order] Applied: ${matchedCount} matched (${cfg.rules.length} rules), ${unmatchedCount} unmatched (position: ${cfg.unmatchedPosition})`);
  buckets.forEach((bucket, i) => {
    if (bucket.length > 0) {
      console.log(`[group-order]   Rule[${i}] "${cfg.rules[i].name}": ${bucket.length} sites`);
    }
  });

  return ordered;
}
