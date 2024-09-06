import News from './components/News.jsx'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/', element: <App />, children: [
      { path: '/', element: <News category="" /> },
      { path: '/business', element: <News category="business" /> },
      { path: '/technology', element: <News category="technology" /> },
      { path: '/education', element: <News category="education" /> },
      { path: '/entertainment', element: <News category="entertainment" /> }

    ]
  }
])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router}>
    <App />
  </RouterProvider>

)
