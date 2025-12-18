import { searchAPI } from '@/lib/source';

/**
 * 搜索API路由
 *
 * 提供全文搜索功能
 * 端点: /api/search
 * 方法: GET
 * 参数: ?query=<搜索词>
 */
export const GET = searchAPI.GET;
