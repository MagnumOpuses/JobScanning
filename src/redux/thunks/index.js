import axios from 'axios'
import { JOB_SELECT } from '../actions/index'

export const fetchTextEnrichment = job => async dispatch => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: process.env.REACT_APP_DEV_TEXT_ENRICHMENT_API_URL,
      url: '/enrichtextdocument',
      data: {
        doc_id: job.id,
        doc_headline: job.header,
        doc_text: job.content,
        include_sentences: false
      }
    })

    console.log(res.data.enriched_candidates)

    dispatch({
      type: JOB_SELECT,
      job: { ...job, enrichment: { ...res } }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
