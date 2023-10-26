import request from '@/utils/request'
const baseUrl = process.env.NODE_ENV == "production" ? "/rem/api" : "/rem/api"

export function openapiJson({ apiDocsUrl, country, displayCountry, displayLanguage, displayName, displayScript, displayVariant, extensionKeys, ISO3Country, ISO3Language, language, script, unicodeLocaleAttributes, unicodeLocaleKeys, variant } = {}) {
  return request({
    url: `${baseUrl}/v3/api-docs?apiDocsUrl=${ apiDocsUrl || "" }&country=${ country || "" }&displayCountry=${ displayCountry || "" }&displayLanguage=${ displayLanguage || "" }&displayName=${ displayName || "" }&displayScript=${ displayScript || "" }&displayVariant=${ displayVariant || "" }&extensionKeys=${ extensionKeys || "" }&ISO3Country=${ ISO3Country || "" }&ISO3Language=${ ISO3Language || "" }&language=${ language || "" }&script=${ script || "" }&unicodeLocaleAttributes=${ unicodeLocaleAttributes || "" }&unicodeLocaleKeys=${ unicodeLocaleKeys || "" }&variant=${ variant || "" }`,
    method: "get",
  });
}
export function openapiYaml({ apiDocsUrl, country, displayCountry, displayLanguage, displayName, displayScript, displayVariant, extensionKeys, ISO3Country, ISO3Language, language, script, unicodeLocaleAttributes, unicodeLocaleKeys, variant } = {}) {
  return request({
    url: `${baseUrl}/v3/api-docs.yaml?apiDocsUrl=${ apiDocsUrl || "" }&country=${ country || "" }&displayCountry=${ displayCountry || "" }&displayLanguage=${ displayLanguage || "" }&displayName=${ displayName || "" }&displayScript=${ displayScript || "" }&displayVariant=${ displayVariant || "" }&extensionKeys=${ extensionKeys || "" }&ISO3Country=${ ISO3Country || "" }&ISO3Language=${ ISO3Language || "" }&language=${ language || "" }&script=${ script || "" }&unicodeLocaleAttributes=${ unicodeLocaleAttributes || "" }&unicodeLocaleKeys=${ unicodeLocaleKeys || "" }&variant=${ variant || "" }`,
    method: "get",
  });
}
