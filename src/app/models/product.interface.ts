export interface ProductImage {
  color?: string;
  url: string;
  isMain?: boolean;
}


export interface Product {
  id:             string;
  category:       Category;
  name:           string;
  description:    string;
  price:          number;
  images:         ProductImage[];
  specifications: Specification[];
}

export interface Category {
  id:   null;
  name: string;
}

export interface Image {
  color:  string;
  url:    string;
  isMain: boolean | null;
}

export interface Specification {
  name:   string;
  values: string[];
}
