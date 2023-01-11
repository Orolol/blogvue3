export type configType = {
  Title: string;
  Meta: string;
  Grid: boolean;
  Comments: boolean;
};

export type postType = {
  ID: number;
  Public: boolean;
  Category: string;
  Tags: tagType[];
  Comments: commentType[];
  Date: Date;
  Views: number;
  UniqueViews: number;
  Contents: contentPostType[];
  MainPicture: string;
};
export type contentPostType = {
  URL?: string;
  Abstract: string;
  Content: string;
  Title: string;
  LanguageID: string;
};

export type commentType = {};
export type tagType = {};

export type categoryType = {
  Name: string;
  Trads: [
    {
      LanguageID: string;
      Name: string;
    }
  ];
};
