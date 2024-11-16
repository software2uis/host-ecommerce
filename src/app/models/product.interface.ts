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

export interface ResponsePaginated {
  content:          Product[];
  pageable:         Pageable;
  totalElements:    number;
  totalPages:       number;
  last:             boolean;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}





export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  sorted:   boolean;
  empty:    boolean;
  unsorted: boolean;
}
