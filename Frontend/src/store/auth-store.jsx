import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
    login: () => {
        sessionStorage.setItem('isAuthenticated', 'true');
        set({ isAuthenticated: true });
    },
    logout: () => {
        sessionStorage.setItem('isAuthenticated', 'false');
        set({ isAuthenticated: false });
    },
}));

export default useAuthStore;
