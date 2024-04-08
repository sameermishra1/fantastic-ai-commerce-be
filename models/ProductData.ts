import 'reflect-metadata';
import { Expose, Type } from "class-transformer";

class TypeId {
  @Expose() typeId!: string;
  @Expose() id!: string;
}

// class LocalizedString {
//   'en-GB': string;
//   'de-DE'?: string;
//   'en-US'?: string;
// }

class Price {
  id!: string;
  @Expose() value!: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  @Expose() country!: string;
}

class ProductImage {
  @Expose() url!: string;
  @Expose() dimensions!: {
    w: number;
    h: number;
  };
}

class Attribute {
  @Expose() name!: string;
  @Expose() value!: string;
}

class Asset {
  @Expose() id!: string;
  @Expose() @Type(() => ProductImage) sources!: ProductImage[];
}

class Availability {
  @Expose() channels?: {
    [key: string]: {
      availableQuantity: number;
    };
  };
}

class Variant {
  @Expose() id!: number;
  @Expose() sku!: string;
  @Expose() prices?: Price[];
  @Expose() images?: ProductImage[];
  @Expose() attributes?: Attribute[];
  @Expose() assets?: Asset[];
  @Expose() availability?: Availability;
}

class Current {
  @Expose() name!: string;
  @Expose() description?: string;
  @Expose() categories?: TypeId[];
  @Expose() slug?: string;
  @Expose() @Type(() => Variant) masterVariant!: Variant;
  @Expose() @Type(() => Variant) variants?: Variant[];
}

class MasterData {
  @Expose() @Type(() => Current) current!: Current;
}
export class ProductData {
  @Expose() id!: string;
  @Expose() key!: string;
  @Expose() productType!: TypeId;
  @Expose() taxCategory?: TypeId;
  @Expose() @Type(() => MasterData)  masterData!: MasterData;
}
