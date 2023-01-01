//prettier-ignore
export type WpApiObject = {
  title?: string & {
    rendered?: string
  },
  content?: {rendered?: string}
  date?: string
  _embedded?: {
    self?: [{slug?: string}],
    'wp:featuredmedia'?: [{source_url?: string}],
  },
  slug?: string,
  jetpack_featured_media_url?: string,
} & []

//class from https://stackoverflow.com/questions/38324949/error-ts2339-property-x-does-not-exist-on-type-y
/*
export class WpApiObject<T> {
  private items: { [key: string]: T }

  public constructor() {
    this.items = Object.create(null)
  }

  public set(key: string, value: T): void {
    this.items[key] = value
  }

  public get(key: string): T {
    return this.items[key]
  }

  public remove(key: string): T {
    let value = this.get(key)
    delete this.items[key]
    return value
  }
}
*/
