//现在，一个常见的需求是多出代码都要从API获取数据，但我们并不想复制代码
//腰线从组件中移除数据逻辑并在整个应用中福永，其中一个解决方案就是创建高阶组件。
//在本实例中，高阶组件会代替增强后的组件来加载数据， 然后以props的形式向子组件提供数据

//我们已经知道，高阶组件其实就是函数，它接受组件和一些其他参数，然后返回添加了某些特殊行为的新组件
import React, {Component} from 'react'
import PropTypes from 'prop-types'

const withData = url => wrappedComponent => {
    return class extends Component {
        constructor(props){
            super(props)

            this.state = {data: []}
        }
        componentDidMout() {
            fetch(url).then(response => response.json()).then(data => this.setState({data}))
        }
        render() {
            return <wrapperComponent {...this.props} {...this.state} />
        }
    }
}

export default withData

const List = ({data: gists}) => {
    return (
        <ul>
            {gists.map(gist => (
                <li key={gist.id}>{gist.description}</li>
            ))}
        </ul>
    )
}

List.propTypes = {
    data: PropTypes.array
}

//得益于偏函数写法，我们可以先定制高阶组件来发起特定请求，然后再多次复用它
const url = 'https://api.github.com/users/gaearon/gists'
const withGists = withData(url)

const ListwithGists = withGists(List)

//高阶组件 withData 很好，但只能加载静态URl,而真实的URL，通常取决于参数或prop
//遗憾的是，在使用高阶组件的时候，props是未知的，因此在发起API请求前，一旦获取prop 就需要触发某个钩子函数。
//可以修改高阶组件，让它接受两种类型的URL参数，一种是当前的字符串类型，另一种势函数，他接受著名的props 并根据传入的参数返回
//URL 实现这一点， 只需要修改componentDidMount 钩子即可。
componentDidMount() {
    const endpoint = typeof url === 'functoin' ? url(this.props) : url
    fetch(endpoint).then(response => response.json()).then(data => this.setState({data}))
}

//现在可以按照如下方式使用这个高阶组件
// const withGist = withData(props => `https://api.github.com/users/${props.username}/gists)

//可以在组件的props 中设置 username 参数，用于加载 gist
//<ListwitghGists username='gaearon' />
