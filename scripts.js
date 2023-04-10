/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"FiUKTletMY65IBpj","label":"Github","bookmarks":[{"id":"VxAorYizVXbIc2xb","label":"Jake","url":"https://github.com/JakeDystopia"},{"id":"3obJ7Q8w7cnkZSsN","label":"Eggroll","url":"https://github.com/GloriousEggroll"}]},{"id":"kSlqEMxGJJI0EP6q","label":"Songs","bookmarks":[{"id":"8WiBYElfFZMbvNRU","label":"Watch me wither","url":"https://www.youtube.com/watch?v=jrdGLHaKJ2k"},{"id":"H7TgWN3fdXq66Vqz","label":"Far away from you","url":"https://www.youtube.com/watch?v=b4jaAf1zLP4"}]},{"id":"vgP6jzPtRt9viBTX","label":"Reddit","bookmarks":[{"id":"9AGTmYoeMDf8a3v9","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"SIK6m9JiBYGMb4TQ","label":"r/warframe","url":"https://www.reddit.com/r/Warframe/"}]},{"id":"uf8uWpJulFfMRUly","label":"Movies","bookmarks":[{"id":"fCoiPVRkyTMmPUji","label":"Interstellar","url":"https://www.primevideo.com/dp/amzn1.dv.gti.1cb125e2-a86d-3537-4f6c-1be5f2e0f5f1?autoplay=0&ref_=atv_cf_strg_wb-4f6c-1be5f2e0f5f1%3Fautoplay%3D0%26ref_%3Datv_cf_strg_wb&usg=AOvVaw37tzfAswEa2dRLF_H74uPQ"},{"id":"ff4P1vrorIIiAoTO","label":"John wick","url":"https://www.primevideo.com/dp/amzn1.dv.gti.b6b9796d-2e0e-5d38-5f54-ba91cbb23bd8?autoplay=0&ref_=atv_cf_strg_wb"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
