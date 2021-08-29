export const getHtmlHead = (config) => {
  const {
    default_title: title,
    default_description: description,
    default_keywords: keywords,
    head_shortcut_icon: icon,
    locale: lang,
    title_prefix: titlePrefix,
    title_separator: titleSeparator,
    title_suffix: titleSuffix,
  } = config;

  return {
    title,
    description,
    keywords,
    icon,
    lang,
    titlePrefix,
    titleSeparator,
    titleSuffix,
  };
};
