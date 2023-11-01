class ApiClient {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static getSerchParams(searchParams: Record<string, string>) {
    return new URLSearchParams({
      searchSimple: '1',
      action: 'process',
      json: '1',
      page_size: '12',
      ...searchParams,
    });
  }

  async fetchProducts(params: Record<string, string | null | undefined>) {
    const filteredParams = Object.entries(params).reduce(
      (prev, [key, value]) => {
        if (value) {
          return { ...prev, [key]: value };
        }
        return prev;
      },
      {}
    );
    const searchParams = ApiClient.getSerchParams(filteredParams);
    const data = await fetch(
      `${this.baseUrl}/cgi/search.pl?${searchParams.toString()}`
    );
    return data.json();
  }

  async fetchProduct(barcode: string) {
    const data = await fetch(`${this.baseUrl}/api/v2/product/${barcode}`);
    return data.json();
  }
}

export default new ApiClient('https://world.openfoodfacts.org');
