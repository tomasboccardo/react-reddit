import Home from '../components/home/Home';
import Subreddit from '../components/subreddit/Subreddit';
import Article from '../components/article/Article';

export default [
	{
		path: '/r/:subreddit',
		exact: true,
		component: Subreddit,
	},
	{
		path: '/r/:subreddit/comments/:id/:title/',
		exact: true,
		component: Article,
	},
	{
		path: '/',
		exact: false,
		component: Home,
	}
]
