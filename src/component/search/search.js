import React from 'react'

export default class SearchBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            url: null,
            method: 'post'
        }
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleFocus() {

    }

    handleBlur() { }

    render() {
        const { url, method } = this.state
        return (
            <div className='search-box'>
                <form action={url} method={method}>
                    <input type='text' onFocus={this.handleFocus} onBlur={this.handleBlur} alt='请输入名称或代码' />
                </form>
            </div>
        )
    }
}

class SearchList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageNo: 1,
            pageSize: 10,
            current: 1,
            pageList: []
        }
        this.handleNext = this.handleNext.bind(this)
        this.handlePre = this.handlePre(this)
        this.handleRefresh = this.handleRefresh.bind(this)
        this.handlePage = this.handlePage.bind(this)
    }

    handleNext() {
        const { pageNo, pageSize, current } = this.state
        let requestBody = {
            pageNo: pageNo,
            pageSize: pageSize
        }
        fetch()
        // todo fetch from url, and update pageList
        this.setState({
            current: current + 1,
            pageList: []
        })
    }

    handlePre() { }

    handleRefresh() { }

    handlePage() { }
}