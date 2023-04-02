export class BaseAgent {
  constructor(private _baseUrl: string) {}

  protected fetch = async <T>(url: string, config?: RequestInit): Promise<T> | never => {
    const finalUrl = `${this._baseUrl}${url}`;

    const res = await fetch(finalUrl, config);

    if (!res.ok) {
      throw new Error(`Coult not fetch ${finalUrl}, status ${res.status}`);
    }

    const data = (await res.json()) as T;

    return data;
  };
}
