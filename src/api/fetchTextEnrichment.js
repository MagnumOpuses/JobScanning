import axios from 'axios'

export default async (doc_id, doc_headline, doc_text) => {
  try {
    return await axios({
      method: 'post',
      baseURL: process.env.REACT_APP_DEV_TEXT_ENRICHMENT_API_URL,
      url: '/enrichtextdocument',
      data: {
        doc_id: doc_id,
        doc_headline: doc_headline,
        doc_text: doc_text,
        include_sentences: false
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
