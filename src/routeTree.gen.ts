/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import type { CreateFileRoute, FileRoutesByPath } from '@tanstack/react-router'

import { Route as rootRouteImport } from './routes/__root'
import { Route as SearchRouteImport } from './routes/search'
import { Route as BookingsuccessRouteImport } from './routes/bookingsuccess'
import { Route as BookingRouteImport } from './routes/booking'
import { Route as AboutRouteImport } from './routes/about'
import { Route as AuthRouteRouteImport } from './routes/_auth/route'
import { Route as IndexRouteImport } from './routes/index'
import { Route as HotelsHotelIdRouteImport } from './routes/hotels/$hotelId'
import { Route as AuthRegisterRouteImport } from './routes/_auth/register'
import { Route as AuthLoginRouteImport } from './routes/_auth/login'

const SearchRoute = SearchRouteImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRouteImport,
} as any)
const BookingsuccessRoute = BookingsuccessRouteImport.update({
  id: '/bookingsuccess',
  path: '/bookingsuccess',
  getParentRoute: () => rootRouteImport,
} as any)
const BookingRoute = BookingRouteImport.update({
  id: '/booking',
  path: '/booking',
  getParentRoute: () => rootRouteImport,
} as any)
const AboutRoute = AboutRouteImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthRouteRoute = AuthRouteRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const HotelsHotelIdRoute = HotelsHotelIdRouteImport.update({
  id: '/hotels/$hotelId',
  path: '/hotels/$hotelId',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthRegisterRoute = AuthRegisterRouteImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRouteRoute,
} as any)
const AuthLoginRoute = AuthLoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRouteRoute,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/booking': typeof BookingRoute
  '/bookingsuccess': typeof BookingsuccessRoute
  '/search': typeof SearchRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/hotels/$hotelId': typeof HotelsHotelIdRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/booking': typeof BookingRoute
  '/bookingsuccess': typeof BookingsuccessRoute
  '/search': typeof SearchRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/hotels/$hotelId': typeof HotelsHotelIdRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/booking': typeof BookingRoute
  '/bookingsuccess': typeof BookingsuccessRoute
  '/search': typeof SearchRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/register': typeof AuthRegisterRoute
  '/hotels/$hotelId': typeof HotelsHotelIdRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/booking'
    | '/bookingsuccess'
    | '/search'
    | '/login'
    | '/register'
    | '/hotels/$hotelId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/booking'
    | '/bookingsuccess'
    | '/search'
    | '/login'
    | '/register'
    | '/hotels/$hotelId'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/about'
    | '/booking'
    | '/bookingsuccess'
    | '/search'
    | '/_auth/login'
    | '/_auth/register'
    | '/hotels/$hotelId'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  AboutRoute: typeof AboutRoute
  BookingRoute: typeof BookingRoute
  BookingsuccessRoute: typeof BookingsuccessRoute
  SearchRoute: typeof SearchRoute
  HotelsHotelIdRoute: typeof HotelsHotelIdRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/booking': {
      id: '/booking'
      path: '/booking'
      fullPath: '/booking'
      preLoaderRoute: typeof BookingRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/bookingsuccess': {
      id: '/bookingsuccess'
      path: '/bookingsuccess'
      fullPath: '/bookingsuccess'
      preLoaderRoute: typeof BookingsuccessRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterRouteImport
      parentRoute: typeof AuthRouteRoute
    }
    '/hotels/$hotelId': {
      id: '/hotels/$hotelId'
      path: '/hotels/$hotelId'
      fullPath: '/hotels/$hotelId'
      preLoaderRoute: typeof HotelsHotelIdRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

declare module './routes/index' {
  const createFileRoute: CreateFileRoute<
    '/',
    FileRoutesByPath['/']['parentRoute'],
    FileRoutesByPath['/']['id'],
    FileRoutesByPath['/']['path'],
    FileRoutesByPath['/']['fullPath']
  >
}
declare module './routes/_auth/route' {
  const createFileRoute: CreateFileRoute<
    '/_auth',
    FileRoutesByPath['/_auth']['parentRoute'],
    FileRoutesByPath['/_auth']['id'],
    FileRoutesByPath['/_auth']['path'],
    FileRoutesByPath['/_auth']['fullPath']
  >
}
declare module './routes/about' {
  const createFileRoute: CreateFileRoute<
    '/about',
    FileRoutesByPath['/about']['parentRoute'],
    FileRoutesByPath['/about']['id'],
    FileRoutesByPath['/about']['path'],
    FileRoutesByPath['/about']['fullPath']
  >
}
declare module './routes/booking' {
  const createFileRoute: CreateFileRoute<
    '/booking',
    FileRoutesByPath['/booking']['parentRoute'],
    FileRoutesByPath['/booking']['id'],
    FileRoutesByPath['/booking']['path'],
    FileRoutesByPath['/booking']['fullPath']
  >
}
declare module './routes/bookingsuccess' {
  const createFileRoute: CreateFileRoute<
    '/bookingsuccess',
    FileRoutesByPath['/bookingsuccess']['parentRoute'],
    FileRoutesByPath['/bookingsuccess']['id'],
    FileRoutesByPath['/bookingsuccess']['path'],
    FileRoutesByPath['/bookingsuccess']['fullPath']
  >
}
declare module './routes/search' {
  const createFileRoute: CreateFileRoute<
    '/search',
    FileRoutesByPath['/search']['parentRoute'],
    FileRoutesByPath['/search']['id'],
    FileRoutesByPath['/search']['path'],
    FileRoutesByPath['/search']['fullPath']
  >
}
declare module './routes/_auth/login' {
  const createFileRoute: CreateFileRoute<
    '/_auth/login',
    FileRoutesByPath['/_auth/login']['parentRoute'],
    FileRoutesByPath['/_auth/login']['id'],
    FileRoutesByPath['/_auth/login']['path'],
    FileRoutesByPath['/_auth/login']['fullPath']
  >
}
declare module './routes/_auth/register' {
  const createFileRoute: CreateFileRoute<
    '/_auth/register',
    FileRoutesByPath['/_auth/register']['parentRoute'],
    FileRoutesByPath['/_auth/register']['id'],
    FileRoutesByPath['/_auth/register']['path'],
    FileRoutesByPath['/_auth/register']['fullPath']
  >
}
declare module './routes/hotels/$hotelId' {
  const createFileRoute: CreateFileRoute<
    '/hotels/$hotelId',
    FileRoutesByPath['/hotels/$hotelId']['parentRoute'],
    FileRoutesByPath['/hotels/$hotelId']['id'],
    FileRoutesByPath['/hotels/$hotelId']['path'],
    FileRoutesByPath['/hotels/$hotelId']['fullPath']
  >
}

interface AuthRouteRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  AboutRoute: AboutRoute,
  BookingRoute: BookingRoute,
  BookingsuccessRoute: BookingsuccessRoute,
  SearchRoute: SearchRoute,
  HotelsHotelIdRoute: HotelsHotelIdRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
