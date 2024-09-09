import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';




export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "خوش آمدید"


  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />

      {state.form == "bookspace" ? <WindowFloat title='book details' onclose={() => {
        delete state.form
        refresh()
      }}>

        <f-c>
          <f-15>book's name:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15>author:</f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-c>

        <f-c>
          <f-15>book's name:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15>country:</f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-c>

        <f-c>
          <f-15>language:</f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-c>

        <f-c>
          <f-15>page's number:</f-15>
          <sp-2 />
          <f-15>{(state.book.pages as number)}</f-15>
        </f-c>

        <g-b style={{ backgroundColor: "#717774" }} onClick={() => {
          if (!state.faves) {
            state.faves = []
          }
          state.faves.push(state.book.title)
          state.form = null
          refresh()
        }}>
          <img src="" style={{ height: 20, width: 20, objectFit: "contain", }} />
        </g-b>

      </WindowFloat> : null
      }

      <Window title={name} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>

        <w-cse style={{ gap: 5, padding: 5 }}>

          {props.books.map(book => {
            return <Block book={book} state={state} refresh={refresh} />

          })}
        </w-cse>
      </Window>
    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()
  for (let book of books) {
    book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
  }

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}