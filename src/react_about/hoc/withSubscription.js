import React, {Component} from 'react'

const DataSource = {}

function withSubscription(WrappedComponent, selectData) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                data: selectData(DataSource, props)
            }
        }
        handleChange = () => {
            this.setState({
                data: selectData(DataSource, this.props)
            })
        }
        componentDidMount() {
            //订阅数据
            DataSource.addChangeListener(this.handleChange)
        }
        compoentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange)
        }
        render() {
            //使用最新的数据渲染组件
            //注意此处将已有的props属性传递给原组件
            return <WrappedComponent data={this..state.data} {...this.props} />
        }
    }
}

const CommentListWithSubscription = withSubscription(CommentList, DataSource => DataSource.getComments())

const BlogPostWIthSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id))

//不应该修改原组件， 高阶组件应该使用组合技术，将 input 组件包含到容器组件中
function logProps(WrappedComponent) {
    return class extends Component {
        componentWillReiveProps(nextProps) {
            console.log('Current props: ', this.props)
            console.log('Next props: ', nextProps)
        }
        render() {
            //用容器组件包裹且不修改包裹组件，才是正确的打开方式
            return <WrappedComponent {...this.props} />
        }
    }
}

//高阶组件应该传递与他要时间的功能点无关的 props 属性，大多数高阶组件都包含一个车如下的 render函数

const withHoc = wrappedComponent => {
    return class extends Component {
        render() {
            //过滤掉与高阶函数功能相关的props属性,使其不再传递
            const { extraProp, ...passThroughProps} = this.props

            //向包裹组件传递 props 属性，一般都是高阶组件的 state 状态
            const injectedProps = 'someStateOrInstanceMethod'

            return (
                <WrappedComponent injectedProp={injectedProps} {...passThroughProps} />
            )
        }
    }
}

//大部分常见高阶组件的函数签名如下所示：

//React Redux's connect
const ConnectedComment = connect(
    commentSelector,
    commentActeions
)(Comment)

//也就是
const enhance = connect(commentListSelector, commentListActions)

const ConnectedComment = enhance(CommentList)

//这种形式有点让人迷惑，有点多余，但是他有一个有用的属性，那就是，类似 connect 函数返回的单参数的高阶组件有着这样的签名格式：
//Component => Component
//输入和输出类型相同的函数是很容易组合在一起的

//不要这样
const EnhancedComponent = withRouter(
    connect(commentSelector(WrappedComponent))
)

//可以使用一个功能组合工具
const enhance = componse(
    //这些都是单参数的高阶组件
    withRouter,
    connect(commentSelector)
)

const EnhancedComponent = enhance(WrappedComponent)

//约定，包装显示名字以便于调试
function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {

    }
    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`
    return WithSubscription
}

functionn getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

//注意事项
//不要在render函数中使用高阶组件
//  在很少的情况下，你可能需要动态的调用高阶组件。那么你就可以在组件的构造函数或生命周期中调用
// 必须将静态方法做拷贝
//   这样做，就需要你清楚的知道有哪些静态方法需要拷贝，你可以使用 hoist-non-react-statics来帮你这自动处理，它会自动拷贝所有的非React的静态方法。
//import hoistNonReactStatic from 'hoist-non-react-statics'
//function enhance(WrappedComponent) {
    //class Enhance extends React.Component {}
    //hoistNonReactStatic(Enhance, WrappedComponent)
    //return Enhance
//}
//Ref属性不能传递
//现在我们提供一个名为 React.forwardRef 的 API 来解决这一问题( React >= 16.3)
