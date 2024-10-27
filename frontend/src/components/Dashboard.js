import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, IconButton, Button, Typography, Box } from '@mui/material';
import { useState } from 'react';
import '../styles/Dashboard.css';

function Dashboard() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate(); // Use useNavigate for programmatic navigation

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Function to handle logout
    const handleLogout = () => {
        // Clear token from local storage or state management
        localStorage.removeItem('token'); // Adjust this if you're using a different method to store tokens

        // Optionally, clear any user data stored in state if applicable
        // e.g., dispatch({ type: 'LOGOUT' });

        // Redirect to the landing page
        navigate('/'); // Redirects to the landing page
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <Typography variant="h4">Dashboard</Typography>
                <IconButton onClick={handleClick}>
                    <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
                    <MenuItem component={Link} to="/settings" onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={() => { handleLogout(); handleClose(); }}>Logout</MenuItem> {/* Updated Logout item */}
                </Menu>
            </header>
            <Box className="dashboard-content">
                <Button component={Link} to="/books-management" variant="contained">Books Management</Button>
                <Button component={Link} to="/borrowing-reservations" variant="contained">Borrowing & Reservations</Button>
                <Button component={Link} to="/analytics" variant="contained">Analytics</Button>
                <Button component={Link} to="/recommendations" variant="contained">Recommendations</Button>
                <Button component={Link} to="/review-system" variant="contained">Review System</Button>
            </Box>
        </div>
    );
}

export default Dashboard;
