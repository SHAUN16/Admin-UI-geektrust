import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

describe('Dashboard Component', () => {
  const mockUserData = [
    { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin', isEdit: false },
    { id: 2, name: 'User 2', email: 'user2@example.com', role: 'User', isEdit: false },
    { id: 3, name: 'User 3', email: 'user3@example.com', role: 'User', isEdit: false },
    { id: 4, name: 'User 4', email: 'user4@example.com', role: 'Admin', isEdit: false },
    { id: 5, name: 'User 5', email: 'user5@example.com', role: 'User', isEdit: false },
    { id: 6, name: 'User 6', email: 'user6@example.com', role: 'Admin', isEdit: false },
    { id: 7, name: 'User 7', email: 'user7@example.com', role: 'User', isEdit: false },
    { id: 8, name: 'User 8', email: 'user8@example.com', role: 'User', isEdit: false },
    { id: 9, name: 'User 9', email: 'user9@example.com', role: 'Admin', isEdit: false },
    { id: 10, name: 'User 10', email: 'user10@example.com', role: 'User', isEdit: false },
    { id: 11, name: 'User 11', email: 'user11@example.com', role: 'User', isEdit: false },
    { id: 12, name: 'User 12', email: 'user12@example.com', role: 'Admin', isEdit: false },
    { id: 13, name: 'User 13', email: 'user13@example.com', role: 'User', isEdit: false },
    { id: 14, name: 'User 14', email: 'user14@example.com', role: 'Admin', isEdit: false },
    { id: 15, name: 'User 15', email: 'user15@example.com', role: 'User', isEdit: false },
  ];
  
  const mockHandleEdit = jest.fn();
  const mockHandleDelete = jest.fn();
  const mockHandleEditValues = jest.fn();
  
  beforeEach(() => {
    render(
      <Dashboard
      userData={mockUserData}
      setUserData={jest.fn()}
      originalData={mockUserData}
      setOriginalData={jest.fn()}
      handleEdit={mockHandleEdit}
      handleEditValues={mockHandleEditValues}
      />
      );
    });
    
    it('renders search bar correctly', () => {
      const searchInput = screen.getByPlaceholderText(/Search/i);
      expect(searchInput).toBeInTheDocument();
    });
    
    it('renders table with user data', () => {
      const tableRows = screen.getAllByRole('row');
      expect(tableRows.length).toBe(11); // Only 10 entries per page plus one for the header row
    });
    
    it('renders the pagination bar',()=>{
      const paginatinonBar = screen.getByTestId('pagination-bar');
      expect(paginatinonBar).toBeInTheDocument();
    })
    
    it('renders refresh message when table is empty', () => {
      const emptyData = [];
      render(
        <Dashboard
        userData={emptyData}
        setUserData={jest.fn()}
        originalData={emptyData}
        setOriginalData={jest.fn()}
        handleEdit={mockHandleEdit}
        handleEditValues={mockHandleEditValues} />
        )
        const empty_table = screen.getByText(/refresh/i);
        expect(empty_table).toBeInTheDocument();
      });
      
      it('delete button is disabled by default', () => {
        const deleteButton = screen.getByText(/Delete/i);
        expect(deleteButton).toBeDisabled();
        fireEvent.click(deleteButton);
        expect(mockHandleDelete).toHaveBeenCalledTimes(0);
  });

  
  });