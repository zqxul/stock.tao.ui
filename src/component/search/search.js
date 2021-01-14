import React from 'react'
import './search.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch, faAngleLeft, faAngleRight, faList } from '@fortawesome/free-solid-svg-icons'

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
            < div className='search-panel' >
                <SearchBox handler={this.handleSearch} />
                <hr className='search-spliter' />
                <ResultPanel />
                <PagePanel />
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
        this.handleClear = this.handleClear.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        })
    }

    handleClear() {
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
            <form className='search-box'>
                <div className='keyword-group'>
                    <Icon className='search-logo' icon={faSearch} />
                    <input className='keyword' name='keyword' type='text' value={keyword} onChange={this.handleChange} placeholder='请输入名称或代码' />
                    <Icon className='reset' icon={faTimes} onClick={this.handleClear} />
                </div>
                {/* <button className='submit' type='submit' onClick={this.handleSubmit}>查询</button> */}
            </form>
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
            <div className="result-panel">
                <Icon className='result-list' icon={faList} />
                <div>content</div>
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
            <div className='page-panel'>
                <button onClick={this.handlePre}><Icon className='page-pre' icon={faAngleLeft} /></button>
                <button onClick={this.handleNext}><Icon className='page-next' icon={faAngleRight} /></button>
            </div>
        )
    }

}
