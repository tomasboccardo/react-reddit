import Home from '../components/home/Home';
import Subreddit from '../components/subreddit/Subreddit';
import Article from '../components/article/Article';

export default [
	{
		path: '/r/:subreddit',
		exact: true,
		component: Subreddit,
		loadData: (store, params) => Subreddit.WrappedComponent.fetchData(store, params),
	},
	{
		path: '/r/:subreddit/comments/:id/:title/',
		exact: true,
		component: Article,
		loadData: (store, params) => Article.WrappedComponent.fetchData(store, params),
	},
	{
		path: '/',
		exact: false,
		component: Home,
		loadData: (store, params) => Home.WrappedComponent.fetchData(store, params),
	}
]

