import httpClient from "./httpClient"

export const crud = async (path: string, data: any, method: string) => {
  switch (method) {
    case "GET":
      return await httpClient.put(path, data);
  }
  
}
