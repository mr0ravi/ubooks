

export const Block = props => {

    if (!props.state.faves) {
        props.state.faves = []
    }

    return <f-x style={{ height: 250, width: 300, flex: 1, minWidth: 150, position: "relative" }}>
        <img className={global.styles.hover} src={props.book.imageLink} style={{ height: 250, width: 300, flex: 1, objectFit: "fill", minWidth: 150 }} onClick={() => {
            props.state.form = "bookspace"
            props.state.book = props.book
            props.refresh()
        }} />

        {props.state.faves.includes(props.book.title) ? <img src="" style={{ height: 30, width: 30, objectFit: "contain", position: "absolute", bottom: 5, right: 5 }} /> : null}
    </f-x>
}