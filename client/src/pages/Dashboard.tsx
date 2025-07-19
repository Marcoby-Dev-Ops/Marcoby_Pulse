import useUserStore from "../stores/userStore";

const Dashboard = () => {
	const { user } = useUserStore();

	return <div>{user?.firstName}</div>;
};

export default Dashboard;
