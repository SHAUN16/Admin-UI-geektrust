import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';

jest.mock('../config', () => ({
    config: { Endpoint: 'mocked-url' }
}));

global.fetch = jest.fn();

describe('App Component', () => {
    it('renders loading state correctly', () => {
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue([]) });

        act(()=>render(<App />));

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state correctly', async () => {
        fetch.mockRejectedValueOnce(new Error('Mocked Error'));

        act(()=>render(<App />));

        await waitFor(() => {
            expect(screen.getByText('Some Error occurred while fetching Data !!!')).toBeInTheDocument();
        });
    });

    it('renders admin UI correctly', async () => {
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue([]) });

        act(()=>render(<App />));

        await waitFor(() => {
            expect(screen.getByText('Admin UI')).toBeInTheDocument();
        });
    });


});