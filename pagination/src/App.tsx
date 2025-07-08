
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from "./components/layout"
import MoviePage from './page/moviePage'
import ActorPage from './page/actorPage'
import OverViewPage from './page/overviewPage'
import SchedulePage from './page/schedulePage'
import NotFoundPage from './page/notFoundPage'
import TicketPage from './page/ticketPage'
import OrderPage from './page/orderPage'
import { ThemeProvider } from './context/theme-provider'

const queryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})
function App() {
  return (
    <QueryClientProvider client={queryClinet}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path="/" element={<OverViewPage />} />
              <Route path="/movies" element={<MoviePage />} />
              <Route path="/actors" element={<ActorPage />} />
              <Route path="/schedules" element={<SchedulePage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/tickets" element={<TicketPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>

      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )

}

export default App
