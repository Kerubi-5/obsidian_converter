// Taken from https://gist.github.com/codeguy/6684588
const str_to_slug = (str: string) => {
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaeeeeiiiioooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str.replace(/^(.+)\|.+$/, '$1') // If the link is in format of [[Linked Note|Display Text]]

  str = str
    .replace(/[^a-z0-9# -]/g, '')  // remove invalid chars
    .replace(/^\s+|\s+$/g, '') // trim
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}

export default str_to_slug;