import React from 'react'

export default class SearchPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: null,
            url: null,
            method: 'post'
        }
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(keyword = null) {
        console.log("handle search, keyword=" + keyword)
    }

    render() {
        return (
            < div >
                <SearchBox handler={this.handleSearch} />
                <hr />
                <ResultPanel />
            </div >
        )
    }
}

class SearchBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        })
    }

    handleFocus() { }

    handleBlur() { }

    handleReset() {
        this.setState({
            keyword: ''
        })
    }

    handleSubmit() {
        const { handler } = this.props
        const { keyword } = this.state
        handler(keyword)
    }

    render() {
        const { keyword } = this.state
        return (
            <div className='search-box'>
                <form>
                    <input className='keyword' type='text' value={keyword} onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} alt='请输入名称或代码' />
                    <button className='reset' type='reset' onClick={this.handleReset}>X</button>
                    <button className='submit' type='submit' onClick={this.handleSubmit}>V</button>
                </form>
            </div>
        )
    }
}

class ResultPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageNo: 1,
            pageSize: 10,
            pageList: []
        }
        this.handleRefresh = this.handleRefresh.bind(this)
    }

    handleRefresh() { }
    render() {
        return (
            <div>
                <div>content</div>
                <PagePanel />
            </div>
        )
    }
}

class PagePanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            current: 1
        }
        this.handleNext = this.handleNext.bind(this)
        this.handlePre = this.handlePre.bind(this)
        this.handlePage = this.handlePage.bind(this)
    }

    handlePre() { }

    handlePage() { }

    handleNext() {
        // const { pageNo, pageSize, current } = this.state

        // todo fetch from url, and update pageList
        // this.setState({
        //     current: current + 1,
        //     pageList: []
        // })
    }

    render() {
        return (
            <div>
                <button type='button' onClick={this.handlePre}>{'<'}</button>
                <button type='button' onClick={this.handleNext}>{'>'}</button>
            </div>
        )
    }

}
