import { Request, Response } from 'express';
import { apiRoot } from '../builders/commercetoolsBuilder';
import { plainToClass } from 'class-transformer';
import { ProductData } from '../models/ProductData';
//define getProductById function that excepts a id parameter
export const getProductById = async (req: Request, res: Response) => {
  //get the id parameter from the request
const id = req.params.id;
const locale = req.query.locale as string; // Get the user's language from the query parameters

  //use the apiRoot to get the product by id
  apiRoot.products().withId({ ID: id }).get().execute().then((response) => {
    //send the response back to the client
    const product = response.body; // Assuming response.body is the product data
    const productModel = transformProductData(product, id, locale);
    res.send(productModel); // Send the transformed model back to the client

    }).catch((error: Error) => {
    //send the error back to the client
    console.log(error);
    res.send(error);
  });
};

//function to transform the product data to the ProductData model
function transformProductData(product: any, id: string, locale: string): ProductData {
  // Assuming response.body is the product data
  const productModel = plainToClass(ProductData, product, { excludeExtraneousValues: true });
  const pickValueByLocale = (data: any, locale: string) => {
    if (data) {
        if(locale){
            return data[locale];}

            else {
                return Object.values(data)[0];
            }
        }
    };
// Pick the name based on the user's language
productModel.masterData.current.name = pickValueByLocale(product.masterData.current.name, locale);
// Pick the description based on the user's locale
productModel.masterData.current.description = pickValueByLocale(product.masterData.current.description, locale);
// Pick the slug based on the user's locale
productModel.masterData.current.slug = pickValueByLocale(product.masterData.current.slug, locale);
  return productModel;
}