
import { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from '../pages/HomeScreen';
import Authentication from '../pages/Authentication';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  import { ToastContainer, toast } from 'react-toastify';



function App() {
  const queryClient=new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <Suspense fallback={<div>Loading...</div>}>
<Routes>
  <Route path='/*' element={<HomeScreen />}></Route>
  <Route path='/auth' element={<Authentication />}></Route>

</Routes>
   </Suspense>
   <ToastContainer position='top-right' theme='dark'/>
   <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
   </QueryClientProvider>
  );
}

export default App;
