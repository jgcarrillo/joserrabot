import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<any> {
  response.status(200).json({
    body: request.body,
  });
}
