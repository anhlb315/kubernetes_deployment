import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { AuthService, GameService } from '../../services';

export function SideBar() {
    const navigate = useNavigate();

    return <div className='sidebar-container'>
        <Sidebar>
            <Menu>
                <MenuItem onClick={() => navigate('/home/profile')}> Profile </MenuItem>
                <SubMenu label="Play">
                    <MenuItem onClick={() => GameService.joinRandomMatch().then((result) => navigate('/home/room', {
                        state: {
                            room: result,
                        }
                    }))}> Random </MenuItem>
                    {/* <MenuItem> Search </MenuItem> */}
                </SubMenu>
                <MenuItem onClick={() => navigate('/home/rooms')}> Rooms </MenuItem>
                <MenuItem onClick={() => navigate('/home/leaderboard')}> Leaderboard </MenuItem>
                <MenuItem onClick={() => { AuthService.logout(); navigate(0) }}> Logout </MenuItem>
            </Menu>
        </Sidebar>
    </div>;
}