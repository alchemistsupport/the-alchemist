import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  SingleTypeSchema,
  ComponentAttribute,
  SetPluginOptions,
  TextAttribute,
  MediaAttribute,
  RichTextAttribute,
  ComponentSchema,
} from '@strapi/strapi';

export type AdminPermission = {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
    RequiredAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    subject: StringAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type AdminUser = {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    lastname: StringAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    username: StringAttribute;
    email: EmailAttribute &
    RequiredAttribute &
    PrivateAttribute &
    UniqueAttribute &
    SetMinMaxLength<{
      minLength: 6;
    }>;
    password: PasswordAttribute &
    PrivateAttribute &
    SetMinMaxLength<{
      minLength: 6;
    }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
    PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
    PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type AdminRole = {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
    RequiredAttribute &
    UniqueAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    code: StringAttribute &
    RequiredAttribute &
    UniqueAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
    PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type AdminApiToken = {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
    RequiredAttribute &
    UniqueAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    description: StringAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }> &
    DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
    RequiredAttribute &
    DefaultTo<'read-only'>;
    accessKey: StringAttribute &
    RequiredAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type AdminApiTokenPermission = {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
    RequiredAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type AdminTransferToken = {
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
    RequiredAttribute &
    UniqueAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    description: StringAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }> &
    DefaultTo<''>;
    accessKey: StringAttribute &
    RequiredAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type AdminTransferTokenPermission = {
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
    RequiredAttribute &
    SetMinMaxLength<{
      minLength: 1;
    }>;
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type PluginUploadFile = {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
    PrivateAttribute;
    folderPath: StringAttribute &
    RequiredAttribute &
    PrivateAttribute &
    SetMinMax<{
      min: 1;
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type PluginUploadFolder = {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
    RequiredAttribute &
    SetMinMax<{
      min: 1;
    }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
    RequiredAttribute &
    SetMinMax<{
      min: 1;
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type PluginI18NLocale = {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
    SetMinMax<{
      min: 1;
      max: 50;
    }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type PluginUsersPermissionsPermission = {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type PluginUsersPermissionsRole = {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
    RequiredAttribute &
    SetMinMaxLength<{
      minLength: 3;
    }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type PluginUsersPermissionsUser = {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
    RequiredAttribute &
    UniqueAttribute &
    SetMinMaxLength<{
      minLength: 3;
    }>;
    email: EmailAttribute &
    RequiredAttribute &
    SetMinMaxLength<{
      minLength: 6;
    }>;
    provider: StringAttribute;
    password: PasswordAttribute &
    PrivateAttribute &
    SetMinMaxLength<{
      minLength: 6;
    }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type ApiBookBook = {
  info: {
    singularName: 'book';
    pluralName: 'books';
    displayName: 'Book';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    seo: ComponentAttribute<'shared.seo'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    title: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    body: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    description: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    book: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::book.book', 'oneToOne', 'admin::user'> &
    PrivateAttribute;
    updatedBy: RelationAttribute<'api::book.book', 'oneToOne', 'admin::user'> &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::book.book',
      'oneToMany',
      'api::book.book'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiCampaignCampaign = {
  info: {
    singularName: 'campaign';
    pluralName: 'campaigns';
    displayName: 'Campaign';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    description: RichTextAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    showSignUpForm: BooleanAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    DefaultTo<true>;
    showOpenTableWidget: BooleanAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    DefaultTo<true>;
    showContactForm: BooleanAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }> &
    DefaultTo<true>;
    headerImage: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    addCampaignImages: BooleanAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    campaignFirsImage: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    campaignSecondImage: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    campaignThirdImage: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;

    CTA: ComponentAttribute<'sections.CTA'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    campaignURL: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    openTableWidget: RichTextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
        localized: true;
      };
    }>;
    updateHeaderImage: BooleanAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    sectionsOrder: JSONAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    updateBanner: BooleanAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    bannerImage: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::campaign.campaign',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::campaign.campaign',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::campaign.campaign',
      'oneToMany',
      'api::campaign.campaign'
    >;
    locale: StringAttribute;
  };
} & CollectionTypeSchema;

export type ApiConfirmationConfirmation = {
  info: {
    singularName: 'confirmation';
    pluralName: 'confirmations';
    displayName: 'Confirmation';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    contact_title: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    contact_description: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    vacancy_title: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    vacancy_description: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    signup_title: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    signup_description: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::confirmation.confirmation',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::confirmation.confirmation',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::confirmation.confirmation',
      'oneToMany',
      'api::confirmation.confirmation'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiContactContact = {
  info: {
    singularName: 'contact';
    pluralName: 'contacts';
    displayName: 'Contact';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    seo: ComponentAttribute<'shared.seo'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    title: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    body: TextAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    contact: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    locate: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    name: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    email: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    phone: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    enquiry: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    message: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    loading: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    submit: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    times: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    monday: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    tuesday: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    wednesday: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    thursday: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    friday: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    saturday: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    sunday: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    first: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    second: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::contact.contact',
      'oneToMany',
      'api::contact.contact'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;
export type ApiFeedbackFeedback = {
  info: {
    singularName: 'feedback';
    pluralName: 'feedbacks';
    displayName: 'Feedback';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    FIB: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;

    Background: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::feedback.feedback',
      'oneToMany',
      'api::feedback.feedback'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiEmailEmail = {
  info: {
    singularName: 'email';
    pluralName: 'emails';
    displayName: 'Email';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    email: TextAttribute;
    to: StringAttribute;
    from: StringAttribute;
    subject: StringAttribute;
    text: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::email.email',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::email.email',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & CollectionTypeSchema;

export type ApiFooterFooter = {
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    Description: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Logo_black: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    Logo_gold: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    info: ComponentAttribute<'sections.about'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    locate: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::footer.footer',
      'oneToMany',
      'api::footer.footer'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiGlobalGlobal = {
  info: {
    singularName: 'global';
    pluralName: 'globals';
    displayName: 'Global';
    name: 'global';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: false;
  };
  attributes: {
    siteName: StringAttribute & RequiredAttribute;
    defaultSeo: ComponentAttribute<'shared.seo'> & RequiredAttribute;
    favicon: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::global.global',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
  };
} & SingleTypeSchema;

export type ApiHeaderHeader = {
  info: {
    singularName: 'header';
    pluralName: 'headers';
    displayName: 'Header';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    book: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    first: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    second: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::header.header',
      'oneToMany',
      'api::header.header'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiHomepageHomepage = {
  info: {
    singularName: 'homepage';
    pluralName: 'homepages';
    displayName: 'Homepage';
    name: 'homepage';
    description: '';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    seo: ComponentAttribute<'shared.seo'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    gallery: ComponentAttribute<'sections.gallery'> &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    about_light: ComponentAttribute<'sections.about'> &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    about_dark: ComponentAttribute<'sections.about'> &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    menus: ComponentAttribute<'sections.menus'> &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    sign_up: ComponentAttribute<'sections.sign-up'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    hero_banner: ComponentAttribute<'sections.hero-banner'> &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::homepage.homepage',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::homepage.homepage',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::homepage.homepage',
      'oneToMany',
      'api::homepage.homepage'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiImpressumImpressum = {
  info: {
    singularName: 'impressum';
    pluralName: 'impressums';
    displayName: 'Impressum';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    notice: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    alchem: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    name: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    place: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    locate: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    manage: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    phone: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    mail: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    court: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    vat: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    europe: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    consumer: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    obligate: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::impressum.impressum',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::impressum.impressum',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::impressum.impressum',
      'oneToMany',
      'api::impressum.impressum'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiMenuMenu = {
  info: {
    singularName: 'menu';
    pluralName: 'menus';
    displayName: 'Menu';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    seo: ComponentAttribute<'shared.seo'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    title: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    body: TextAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    description: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    food: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    foodDescripton: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    drinks: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    drinksDescription: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    signUp: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    signUpDescription: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    food_button: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    liquids_button: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    brunch_button: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    brunch: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    brunch_description: TextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    sign_up: ComponentAttribute<'sections.sign-up'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    click: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    hero_banner: ComponentAttribute<'sections.hero-banner'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    foodPrimaryImage: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    foodSecondaryImage: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    foodTextImage: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    drinksPrimaryImage: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    brunchPrimaryImage: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    foodPdfUrl: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    drinksPdfUrl: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    brunchPdfUrl: StringAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::menu.menu', 'oneToOne', 'admin::user'> &
    PrivateAttribute;
    updatedBy: RelationAttribute<'api::menu.menu', 'oneToOne', 'admin::user'> &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::menu.menu',
      'oneToMany',
      'api::menu.menu'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiModalModal = {
  info: {
    singularName: 'modal';
    pluralName: 'modals';
    displayName: 'Modal';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    open: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    book: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    description: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    delay: NumberAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    big_circle: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    text_image: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    image_in_the_middle: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    button_image: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    small_circle: MediaAttribute &
    RequiredAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::modal.modal',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::modal.modal',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::modal.modal',
      'oneToMany',
      'api::modal.modal'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiPolicyPolicy = {
  info: {
    singularName: 'policy';
    pluralName: 'policies';
    displayName: 'Policy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    content: RichTextAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::policy.policy',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::policy.policy',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::policy.policy',
      'oneToMany',
      'api::policy.policy'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiScreenmenuScreenmenu = {
  info: {
    singularName: 'screenmenu';
    pluralName: 'screenmenus';
    displayName: 'Fullscreenmenu';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    book: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    mail: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    image: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    navigation: ComponentAttribute<'shared.navigation-link', true> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::screenmenu.screenmenu',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::screenmenu.screenmenu',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::screenmenu.screenmenu',
      'oneToMany',
      'api::screenmenu.screenmenu'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type ApiVacancyVacancy = {
  info: {
    singularName: 'vacancy';
    pluralName: 'vacancies';
    displayName: 'Vacancy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    seo: ComponentAttribute<'shared.seo'> &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    title: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    body: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    apply: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    cv: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    name: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    email: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    phone: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    enquiry: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    vacancy: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    message: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    submit: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    loading: StringAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    first: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    second: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    third: MediaAttribute &
    SetPluginOptions<{
      i18n: {
        localized: true;
      };
    }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::vacancy.vacancy',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::vacancy.vacancy',
      'oneToOne',
      'admin::user'
    > &
    PrivateAttribute;
    localizations: RelationAttribute<
      'api::vacancy.vacancy',
      'oneToMany',
      'api::vacancy.vacancy'
    >;
    locale: StringAttribute;
  };
} & SingleTypeSchema;

export type SectionsAbout = {
  info: {
    displayName: 'about';
    description: '';
  };
  attributes: {
    description: TextAttribute & RequiredAttribute;
    body_text: TextAttribute & RequiredAttribute;
    about: TextAttribute;
    primary_image: MediaAttribute & RequiredAttribute;
    secondary_image: MediaAttribute;
  };
} & ComponentSchema;

export type SectionsCarousel = {
  info: {
    displayName: 'Carousel';
  };
  attributes: {
    food: StringAttribute;
    menu: StringAttribute;
    brunch: StringAttribute;
    drinks: StringAttribute;
  };
} & ComponentSchema;

export type SectionsForm = {
  info: {
    displayName: 'form';
    description: '';
  };
  attributes: {
    description: TextAttribute & RequiredAttribute;
    body_text: TextAttribute & RequiredAttribute;
    title: StringAttribute;
    body: StringAttribute;
    email: StringAttribute;
    birthday: StringAttribute;
    loading: StringAttribute;
    submit: StringAttribute;
  };
} & ComponentSchema;

export type SectionsGallery = {
  info: {
    displayName: 'gallery';
    description: '';
  };
  attributes: {
    images: MediaAttribute & RequiredAttribute;
  };
} & ComponentSchema;

export type SectionsHeroBanner = {
  info: {
    displayName: 'Hero Banner';
    description: '';
  };
  attributes: {
    primary_image: MediaAttribute & RequiredAttribute;
    background_image: MediaAttribute & RequiredAttribute;
    secondary_image: MediaAttribute;
  };
} & ComponentSchema;

export type SectionsMenus = {
  info: {
    displayName: 'menus';
    description: '';
  };
  attributes: {
    description: TextAttribute & RequiredAttribute;
    body_text: TextAttribute & RequiredAttribute;
    gallery_mobile: ComponentAttribute<'shared.menu-card', true> &
    RequiredAttribute &
    SetMinMax<{
      min: 3;
      max: 3;
    }>;
    gallery_pc: ComponentAttribute<'shared.menu-card', true> &
    RequiredAttribute &
    SetMinMax<{
      min: 3;
      max: 3;
    }>;
  };
} & ComponentSchema;

export type SectionsSignUp = {
  info: {
    displayName: 'sign up';
    description: '';
  };
  attributes: {
    sign_up: StringAttribute;
    description: TextAttribute;
    title: StringAttribute;
    body: StringAttribute;
    email: StringAttribute;
    birthday: StringAttribute;
    loading: StringAttribute;
    submit: StringAttribute;
    label: StringAttribute;
  };
} & ComponentSchema;

export type SharedForm = {
  info: {
    displayName: 'Form';
    description: '';
  };
  attributes: {
    firstName: StringAttribute;
    secondName: StringAttribute;
    birthday: StringAttribute;
    loading: StringAttribute;
    submit: StringAttribute;
    email: StringAttribute;
    name: StringAttribute;
    message: StringAttribute;
    cv: StringAttribute;
    phone: StringAttribute;
    subject: StringAttribute;
  };
} & ComponentSchema;

export type SharedMenuCard = {
  info: {
    displayName: 'menu card';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    image: MediaAttribute & RequiredAttribute;
    secondary_image: MediaAttribute;
    text_image: MediaAttribute;
    url: StringAttribute;
  };
} & ComponentSchema;

export type SharedNavigationLink = {
  info: {
    displayName: 'Navigation Link';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
  };
} & ComponentSchema;

export type SharedSeo = {
  info: {
    name: 'Seo';
    icon: 'allergies';
  };
  attributes: {
    metaTitle: StringAttribute & RequiredAttribute;
    metaDescription: TextAttribute & RequiredAttribute;
    shareImage: MediaAttribute;
  };
} & ComponentSchema;

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::book.book': ApiBookBook;
      'api::campaign.campaign': ApiCampaignCampaign;
      'api::feedback.feedback': ApiFeedbackFeedback;
      'api::confirmation.confirmation': ApiConfirmationConfirmation;
      'api::contact.contact': ApiContactContact;
      'api::email.email': ApiEmailEmail;
      'api::footer.footer': ApiFooterFooter;
      'api::global.global': ApiGlobalGlobal;
      'api::header.header': ApiHeaderHeader;
      'api::homepage.homepage': ApiHomepageHomepage;
      'api::impressum.impressum': ApiImpressumImpressum;
      'api::menu.menu': ApiMenuMenu;
      'api::modal.modal': ApiModalModal;
      'api::policy.policy': ApiPolicyPolicy;
      'api::screenmenu.screenmenu': ApiScreenmenuScreenmenu;
      'api::vacancy.vacancy': ApiVacancyVacancy;
      'sections.about': SectionsAbout;
      'sections.carousel': SectionsCarousel;
      'sections.form': SectionsForm;
      'sections.gallery': SectionsGallery;
      'sections.hero-banner': SectionsHeroBanner;
      'sections.menus': SectionsMenus;
      'sections.sign-up': SectionsSignUp;
      'shared.form': SharedForm;
      'shared.menu-card': SharedMenuCard;
      'shared.navigation-link': SharedNavigationLink;
      'shared.seo': SharedSeo;
    }
  }
}
