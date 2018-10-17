export interface INlpService {
  process(message: string): Promise<{speech: string, link: string}>;
}
