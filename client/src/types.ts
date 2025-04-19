export default interface Result {
  url: string;          // ✅ should match `URL`
  statusCode: string;   // ❌ should be `number`
  statusText: number;   // ❌ should be `string`
  responseMS: number;   // ✅ matches
  error?: string;       // ✅ matches
}