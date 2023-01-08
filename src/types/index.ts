export interface ISectionProps {
  children?: any;
  style?: any;
  cardStyle?: any;
  title?: string;
  subTitleComp?: any;
}

export interface IOption {
  id?: string | number;
  title: string;
  value: any;
}

export interface INew {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface IStudent {
  id?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  rollNumber?: string;
  class?: string;
  isEnabled?: boolean;
}

export interface IChatMessage {
  _id: string;
  text: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

export interface IStoreMessage {
  chatId: string;
  createdAt: string;
  text: string;
  sender: {
    id: string;
    image: string;
    name: string;
  };
}

export interface IChat {
  id?: string;
  createdAt?: string;
  studentId?: string;
  studentName?: string;
  class?: string;
  rollNumber?: string;
  updatedAt?: string;
  studentImage?: string;
  lastMessage?: string;
}

export interface IGetDocuemtnsParams {
  studentName?: string;
  isPaginating?: boolean;
  isSearching?: boolean;
  isRefreshing?: boolean;
}

export interface ISearchInputProps {
  searchQuery: string;
  onChangeText: (value: string) => void;
}

export interface IChatCardProps {
  query: string;
  chat: IChat;
}
