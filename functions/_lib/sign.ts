/**
 * 公众号回调签名校验(明文模式)
 *
 * 微信公众号配置服务器地址时,会带 signature / timestamp / nonce 三个参数
 * 校验规则:把 token / timestamp / nonce 字典序排序拼接,sha1 后与 signature 比对。
 */
export async function verifyWeChatSignature(params: {
  signature: string;
  timestamp: string;
  nonce: string;
  token: string;
}): Promise<boolean> {
  const arr = [params.token, params.timestamp, params.nonce].sort();
  const data = arr.join('');
  const buf = new TextEncoder().encode(data);
  const hashBuf = await crypto.subtle.digest('SHA-1', buf);
  const hex = Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hex === params.signature;
}
