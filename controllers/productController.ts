import { Request, Response } from 'express';
import { apiRoot } from '../builders/commercetoolsBuilder';
import { plainToClass } from 'class-transformer';
import { Price, ProductData, Variant } from '../models/ProductData';

/**
 * Retrieves a product by its ID and transforms the product data based on the user's locale.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The transformed product data.
 */
export const getProductById = async (req: Request, res: Response) => {
  //get the id parameter from the request
const id = req.params.id;
const locale = req.query.locale as string; // Get the user's language from the query parameters
const country = req.query.country as string; // Get the user's country from the query parameters

  //use the apiRoot to get the product by id
  apiRoot.products().withId({ ID: id }).get().execute().then((response) => {
    //send the response back to the client
    const product = response.body; // Assuming response.body is the product data
    const productModel = transformProductData(product, id, locale, country); // Transform the product data
    res.send(productModel); // Send the transformed model back to the client

    }).catch((error: Error) => {
    //send the error back to the client
    console.log(error);
    res.send(error);
  });
};

//function to transform the product data to the ProductData model
/**
 * Transforms the product data by picking the values based on the user's locale.
 * @param product - The product data to transform.
 * @param id - The ID of the product.
 * @param locale - The user's locale.
 * @returns The transformed product data.
 */
function transformProductData(product: any, id: string, locale: string, country: string): ProductData {
  const productModel = plainToClass(ProductData, product, { excludeExtraneousValues: true });
  selectPriceByCountry(product, country, productModel); // Select the price based on the user's country
  const pickValueByLocale = (data: any, locale: string) => {
    if (data) {
        //data can be of 2 types can be of 2 type 
        // { "key": "#000", "label": { "de-DE": "Schwarz", "en-GB": "Black", "en-US": "Black" } 
        // or 
        // { "en-GB": "Large" }
        // check and handle both the cases
        if(data.hasOwnProperty('key')){
            if(locale){
                return {key: data.key, label: data.label[locale]};
            }else {
                return {key: data.key, label: Object.values(data.label)[0]};
            }
        }
        else {
        if(locale){
            return data[locale];}
            else {
                return Object.values(data)[0];
            }
        }
    }
    };
// Pick the name based on the user's language
productModel.masterData.current.name = pickValueByLocale(product.masterData.current.name, locale);
// Pick the description based on the user's locale
productModel.masterData.current.description = pickValueByLocale(product.masterData.current.description, locale);
// Pick the slug based on the user's locale
productModel.masterData.current.slug = pickValueByLocale(product.masterData.current.slug, locale);
//mapping the variant Attributes
productModel.masterData.current.variants?.forEach((variant) => {
    variant.attributes?.forEach((attribute) => {
        attribute.value = pickValueByLocale(attribute.value, locale);
    });});
//mapping the master variant Attributes
productModel.masterData.current.masterVariant.attributes?.forEach((attribute) => {
    attribute.value = pickValueByLocale(attribute.value, locale);
});

  return productModel;
}

// function to select price based on user's country from product data and save it on ProductData model instead of prices from multiple countries
/**
 * Selects the price based on the user's country and saves it in the ProductData model.
 * @param product - The product data.
 * @param country - The user's country.
 * @param productModel - The transformed product data.
 */
function selectPriceByCountry(product: any, country: string, productModel: ProductData) {
    // get the price list for master variant
    const masterVariantPrices = product.masterData.current.masterVariant.prices;
    //filter the prices based on the user's country and get a list of filterd prices
    const filteredPrices = masterVariantPrices.filter((price: Price) => price.country === country);
    //save filtered prices on master variant
    productModel.masterData.current.masterVariant.prices = filteredPrices;
    //get the price list for variants
    const variants = product.masterData.current.variants;

    //create a variable named filteredVariants as empty list of Variants
    const filteredVariants: Variant[] = [];

    //filter the prices based on the user's country and get a list of filterd prices
    variants?.forEach((variant: Variant) => {
        const filteredPricesVariant = variant.prices?.filter((price: Price) => price.country === country);
        console.log(filteredPricesVariant);
        //save filtered prices on variants
        variant.prices = filteredPricesVariant;
        filteredVariants.push(variant);
    });
    product.masterData.current.variants = filteredVariants;

    }