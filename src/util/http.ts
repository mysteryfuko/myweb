import axios from 'axios'

export type Props = {
    id?: number
    click: number
    name: string
    url: string
    icon: string
    belong: number
    isFolder?: boolean
}

type addData = {
    action: string
    where: string
    data: Props | { id: number } | { title: string, content: string, id: number } | { name: string, belong?: number } | clothesItems
}
export type BlogTag = {
    id: number
    name: string
    belong: number

}
export type BlogTagData = {
    tag: BlogTag[]
    list: BlogTag[]
}

export type Floder = {
    id: number
    name: string
}
const server = axios.create({
    baseURL: 'http://192.168.0.200/',
    // baseURL: 'http://127.0.0.1:8000/',
})
export type clothesItems = {
    id?: number
    name: string
    color: string
    rate: number
    des: string
    compare?:number
}
export const getClothes = async (): Promise<clothesItems[]> => {
    const res = await server.get(`/get/clothes/0`)
    return res.data
}

export const getSearchKey = async (keyword: string): Promise<Props[]> => {
    const res = await server.get(`/get/search/${keyword}`)
    return res.data.s.map((i: string) => ({ value: i }))
}

export const getWebPage = async (keyword: number): Promise<Props[]> => {
    const res = await server.get(`/get/webcollect/${keyword}`)
    return res.data
}

export const getNavTag = async (): Promise<Floder[]> => {
    const res = await server.get(`/get/navigtag/0`)
    return res.data
}

export const postData = async (data: addData): Promise<boolean> => {
    const res = await server.post(`/post/`, {
        data
    })
    if (res.status === 200) {
        return true
    }
    return false
}

export const Login = async (data: { username: string, password: string }): Promise<string> => {
    const res = await server.post(`/post/`, {
        'data': {
            'action': 'login',
            data
        }
    })
    return res.data
}
export const getBlogTag = async (): Promise<BlogTagData> => {
    const res = await server.get(`/get/blogtag/all`)
    let data: BlogTagData = {
        tag: [],
        list: [],
    }
    res.data.forEach((i: BlogTag) => {
        if (i.belong == 0) {
            data.tag.push(i)
        }
        else {
            data.list.push(i)
        }
    })
    return data
}

export type Blog = {
    id: number
    title: string
    content: string
    create_time: string
    belong: number
}
export const getBlogList = async (id: number, page: number): Promise<Blog[]> => {
    const res = await server.get(`/get/bloglist/${id}/${page}`)
    return res.data
}

export const getBlog = async (id: number): Promise<Blog> => {
    const res = await server.get(`/get/blog/${id}`)
    return res.data[0]
}