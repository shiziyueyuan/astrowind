export {};

const copy = {
  zh: {
    workspace: '本机写作间',
    language: '语言',
    title: '让零散的想法，有个地方落下。',
    intro: '导入 Markdown，整理一下，然后决定是留作草稿，还是公开给路过的人看。',
    private: '这个管理页只在你的电脑上开放。公开博客只读，不开放评论或回复。',
    editor: '写一篇',
    newPost: '新文章',
    upload: '选择或拖入 .md 文件',
    uploadHint: '也可以直接在下方写作。每次导入一份文件，最大 1 MB。',
    postTitle: '标题',
    postLanguage: '正文语言',
    kind: '分类',
    kindNote: '闲言碎语',
    kindLog: '日志',
    kindEssay: '观点',
    kindExperiment: '实验',
    date: '日期',
    address: '文章地址',
    addressHint: '小写英文字母、数字与短横线。不同语言使用相同地址，可以关联为译文。',
    description: '简介（可选）',
    tags: '标签（逗号分隔，可选）',
    body: '正文 · Markdown',
    bodyHint: '支持标题、列表、引用、表格、代码与图片网址。正文不会自动翻译；其他语言页面会明确标注原文。',
    saveDraft: '保存草稿',
    publishLocal: '发布到本地预览',
    viewResult: '查看文章',
    website: '公开网站',
    syncHint: '本地发布后，点击同步，公开网站会通过 GitHub 自动更新。',
    sync: '同步到公开网站',
    visit: '打开公开博客 ↗',
    writing: '我的文字',
    refresh: '刷新',
    draftHint: '草稿只保存在本机。修改已发布文章时，保存草稿会保留网站上的旧版本。',
    noPosts: '还没有文章，先写一点什么。',
    footer: '时咨月圆 / Shea · 只读的公开博客，自由的私人写作间。',
    edit: '编辑',
    draft: '草稿',
    published: '已在本地发布',
    draft_saved: '草稿已保存。',
    imported: '已导入，可以修改后保存。',
    saving: '正在保存…',
    building: '正在更新本地预览，请稍候…',
    syncing: '正在同步到 GitHub…',
    published_local: '已更新本地预览。点击下方链接阅读。',
    synced: '已提交到 GitHub，公开网站正在自动更新，通常需要几分钟。',
    idle: '',
    operation_failed: '操作未完成。内容会保留；请检查网络或稍后重试。',
    build_failed: '发布未成功，文章已保留为草稿。请检查正文中的图片路径等内容，再试一次。',
    exists: '这个文章地址已经存在。请从“我的文字”载入文章后修改，或更换地址。',
    changed: '文章有新的修改，请重新载入后再保存。',
    other_changes: '还有其他网站更新待保存，请先完成当前开发后再同步。',
    wrong_repository: '当前项目与已配置的公开仓库不一致，暂不能同步。',
    invalid_file: '请选择 .md 文件。',
    invalid_metadata: '文件开头的信息格式无法识别，请检查 Markdown。',
    invalid_address: '文章地址只能使用小写英文字母、数字和短横线。',
    invalid_title: '请填写标题（最多 200 字）。',
    invalid_body: '请填写正文，文件最大 1 MB。',
    invalid_kind: '请选择文章分类。',
    invalid_date: '请选择有效日期。',
    too_large: '文件太大，请使用 1 MB 以内的 Markdown。',
    forbidden: '请从本机管理页重新打开。',
    busy: '正在处理上一篇文章，请稍候。',
    not_found: '文章未找到，请刷新列表。',
    offline: '管理服务未连接，请先打开本机写作间启动程序。',
  },
  en: {
    workspace: 'Local writing studio',
    language: 'Language',
    title: 'A little room for passing thoughts.',
    intro: 'Import Markdown, shape it a little, then keep a draft or share it with a passerby.',
    private:
      'This manager is available only on your computer. The public blog is read-only, with no comments or replies.',
    editor: 'Write something',
    newPost: 'New article',
    upload: 'Choose or drop a .md file',
    uploadHint: 'Or write directly below. One file at a time, up to 1 MB.',
    postTitle: 'Title',
    postLanguage: 'Article language',
    kind: 'Category',
    kindNote: 'Fragments',
    kindLog: 'Journal',
    kindEssay: 'Essay',
    kindExperiment: 'Experiment',
    date: 'Date',
    address: 'Article address',
    addressHint: 'Lowercase Latin letters, numbers and hyphens. Use the same address to link translations.',
    description: 'Description (optional)',
    tags: 'Tags (comma-separated, optional)',
    body: 'Article · Markdown',
    bodyHint:
      'Headings, lists, quotes, tables, code and image URLs are supported. Text is not automatically translated; other languages identify the original.',
    saveDraft: 'Save draft',
    publishLocal: 'Publish locally',
    viewResult: 'Read article',
    website: 'Public website',
    syncHint: 'After local publication, sync to let GitHub update the public site.',
    sync: 'Sync public website',
    visit: 'Open public blog ↗',
    writing: 'My writing',
    refresh: 'Refresh',
    draftHint: 'Drafts stay on this computer. Draft edits keep the previous published version on the website.',
    noPosts: 'No writing yet. A little space for the first thought.',
    footer: 'Shea / 时咨月圆 · A public reading space. A private writing studio.',
    edit: 'Edit',
    draft: 'Draft',
    published: 'Published locally',
    draft_saved: 'Draft saved.',
    imported: 'Imported. Edit and save when ready.',
    saving: 'Saving…',
    building: 'Updating the local preview…',
    syncing: 'Syncing to GitHub…',
    published_local: 'Local preview updated. Read the article below.',
    synced: 'Sent to GitHub. The public website is updating; this usually takes a few minutes.',
    idle: '',
    operation_failed: 'The operation could not finish. Your writing is retained; check the connection and try again.',
    build_failed: 'Publication failed. Your writing is kept as a draft. Check image paths and the article, then retry.',
    exists: 'This address already exists. Load the article from My writing, or choose a different address.',
    changed: 'The article changed. Load it again before saving.',
    other_changes: 'Other website changes are pending. Finish the current development before syncing.',
    wrong_repository: 'This project does not match the configured public repository.',
    invalid_file: 'Choose a .md file.',
    invalid_metadata: 'The Markdown metadata could not be read.',
    invalid_address: 'Use lowercase Latin letters, numbers and hyphens for the address.',
    invalid_title: 'Enter a title, up to 200 characters.',
    invalid_body: 'Enter article text, up to 1 MB.',
    invalid_kind: 'Choose a category.',
    invalid_date: 'Choose a valid date.',
    too_large: 'Choose Markdown smaller than 1 MB.',
    forbidden: 'Reopen the local studio.',
    busy: 'Another article is being processed. Please wait.',
    not_found: 'Article not found. Refresh the list.',
    offline: 'The studio is not connected. Start the local writing studio first.',
  },
  ja: {
    workspace: 'ローカル執筆室',
    language: '言語',
    title: 'ふと浮かんだ考えに、居場所を。',
    intro: 'Markdown を読み込み、少し整えて、下書きとして残すか、通りがかりの人へ公開します。',
    private: 'この管理画面は自分のパソコンでのみ利用できます。公開ブログは閲覧専用で、コメント・返信はできません。',
    editor: '文章を書く',
    newPost: '新しい文章',
    upload: '.md ファイルを選択・ドロップ',
    uploadHint: '下で直接書くこともできます。1 回につき 1 ファイル、最大 1 MB。',
    postTitle: 'タイトル',
    postLanguage: '本文の言語',
    kind: '分類',
    kindNote: 'ひとりごと',
    kindLog: '日誌',
    kindEssay: 'エッセイ',
    kindExperiment: '実験',
    date: '日付',
    address: '記事のアドレス',
    addressHint: '半角英小文字・数字・ハイフンを使います。翻訳には同じアドレスを指定してください。',
    description: '概要（任意）',
    tags: 'タグ（カンマ区切り・任意）',
    body: '本文 · Markdown',
    bodyHint:
      '見出し、リスト、引用、表、コード、画像 URL に対応。本文は自動翻訳されず、他言語の画面では原文と明記します。',
    saveDraft: '下書きを保存',
    publishLocal: 'ローカルに公開',
    viewResult: '記事を読む',
    website: '公開サイト',
    syncHint: 'ローカル公開後に同期すると、GitHub が公開サイトを更新します。',
    sync: '公開サイトと同期',
    visit: '公開ブログを開く ↗',
    writing: '自分の文章',
    refresh: '更新',
    draftHint:
      '下書きはこのパソコンだけに保存されます。公開済み記事の下書きを編集しても、サイトには以前の版が残ります。',
    noPosts: '文章はまだありません。最初のひとことをどうぞ。',
    footer: '时咨月圆 / Shea · 公開は読むための場所。執筆は自分だけの場所。',
    edit: '編集',
    draft: '下書き',
    published: 'ローカル公開済み',
    draft_saved: '下書きを保存しました。',
    imported: '読み込みました。編集して保存できます。',
    saving: '保存中…',
    building: 'ローカルプレビューを更新中…',
    syncing: 'GitHub と同期中…',
    published_local: 'ローカルを更新しました。下のリンクから読めます。',
    synced: 'GitHub に送信しました。公開サイトの更新には通常数分かかります。',
    idle: '',
    operation_failed: '処理を完了できませんでした。文章は残ります。接続を確認して再試行してください。',
    build_failed: '公開に失敗しました。文章は下書きとして保存されています。画像パスなどを確認してください。',
    exists: '同じアドレスの記事があります。一覧から読み込むか、アドレスを変更してください。',
    changed: '記事が変更されています。再度読み込んでから保存してください。',
    other_changes: 'ほかのサイト更新が保留中です。現在の開発を完了してから同期してください。',
    wrong_repository: '設定済みの公開リポジトリと一致しません。',
    invalid_file: '.md ファイルを選択してください。',
    invalid_metadata: 'Markdown 冒頭の情報を読み取れませんでした。',
    invalid_address: 'アドレスは半角英小文字・数字・ハイフンで入力してください。',
    invalid_title: 'タイトルを 200 文字以内で入力してください。',
    invalid_body: '本文を入力してください。最大 1 MB です。',
    invalid_kind: '分類を選択してください。',
    invalid_date: '有効な日付を指定してください。',
    too_large: '1 MB 以下の Markdown を選択してください。',
    forbidden: 'ローカル執筆室を開き直してください。',
    busy: 'ほかの記事を処理中です。お待ちください。',
    not_found: '記事がありません。一覧を更新してください。',
    offline: '管理サービスに接続できません。先にローカル執筆室を起動してください。',
  },
};
let locale = navigator.language.startsWith('ja') ? 'ja' : navigator.language.startsWith('en') ? 'en' : 'zh';
let token = '';
let defaultDate = '';
let revision = null;
let polling = false;
const form = document.querySelector('#post-form');
const fields = Object.fromEntries(
  [...form.elements].filter((element) => element.name).map((element) => [element.name, element])
);
const status = document.querySelector('#status');
const resultLink = document.querySelector('#result-link');
const message = (key, error = false) => {
  status.textContent = copy[locale][key] ?? copy[locale].operation_failed;
  status.classList.toggle('error', error);
};
function translate() {
  document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : locale;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = copy[locale][element.dataset.i18n] ?? '';
  });
  document.querySelector('#ui-language').value = locale;
}
async function api(url, data) {
  let response;
  try {
    response = await fetch(
      url,
      data
        ? {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Shea-Studio': token },
            body: JSON.stringify(data),
          }
        : undefined
    );
  } catch {
    throw new Error('offline');
  }
  const value = await response.json();
  if (!response.ok) throw new Error(value.error ?? 'operation_failed');
  return value;
}
function fill(post) {
  fields.title.value = post.title ?? '';
  fields.locale.value = post.locale ?? 'zh';
  fields.kind.value = post.kind ?? 'note';
  fields.key.value = post.key ?? '';
  fields.date.value = post.date ?? defaultDate;
  fields.description.value = post.description ?? '';
  fields.tags.value = (post.tags ?? []).join(', ');
  fields.body.value = post.body ?? '';
  revision = post.revision ?? null;
  fields.key.disabled = Boolean(revision);
  fields.locale.disabled = Boolean(revision);
  resultLink.hidden = true;
}
async function refresh() {
  const posts = await api('/api/posts');
  const list = document.querySelector('#posts');
  list.replaceChildren();
  document.querySelector('#no-posts').hidden = posts.length > 0;
  for (const post of posts) {
    const item = document.createElement('li');
    const title = document.createElement('h3');
    title.textContent = post.title;
    const meta = document.createElement('p');
    meta.textContent = `${copy[locale][post.state]} · ${post.locale.toUpperCase()} · ${post.date}`;
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.textContent = copy[locale].edit;
    edit.addEventListener('click', async () => {
      try {
        fill(await api(`/api/post?locale=${encodeURIComponent(post.locale)}&key=${encodeURIComponent(post.key)}`));
        message('imported');
        fields.title.focus();
      } catch (error) {
        message(error.message, true);
      }
    });
    item.append(title, meta, edit);
    list.append(item);
  }
}
function busy(value) {
  document.querySelectorAll('button').forEach((button) => {
    button.disabled = value;
  });
}
async function poll() {
  if (polling) return;
  polling = true;
  busy(true);
  try {
    let state;
    do {
      state = await api('/api/status');
      message(state.step, state.state === 'failed');
      if (state.state === 'running') await new Promise((resolve) => setTimeout(resolve, 1500));
    } while (state.state === 'running');
    if (state.preview) {
      resultLink.href = state.preview;
      resultLink.hidden = false;
    }
    await refresh();
    if (fields.key.value) {
      try {
        const current = await api(`/api/post?locale=${fields.locale.value}&key=${fields.key.value}`);
        revision = current.revision;
        fields.key.disabled = true;
        fields.locale.disabled = true;
      } catch {
        /* Keep the editor contents when publication fails. */
      }
    }
  } catch (error) {
    message(error.message, true);
  } finally {
    polling = false;
    busy(false);
  }
}
async function save(action) {
  if (!form.reportValidity()) return;
  busy(true);
  message('saving');
  resultLink.hidden = true;
  try {
    const input = Object.fromEntries(Object.entries(fields).map(([name, element]) => [name, element.value]));
    input.tags = input.tags
      .split(/[,，]/)
      .map((tag) => tag.trim())
      .filter(Boolean);
    const state = await api('/api/save', { ...input, action, revision });
    if (state.state === 'running') await poll();
    else {
      message(state.state);
      await refresh();
      const current = await api(`/api/post?locale=${fields.locale.value}&key=${fields.key.value}`);
      revision = current.revision;
      fields.key.disabled = true;
      fields.locale.disabled = true;
    }
  } catch (error) {
    message(error.message, true);
  } finally {
    if (!polling) busy(false);
  }
}
async function importFile(file) {
  if (!file) return;
  try {
    if (!/\.md$/i.test(file.name)) throw new Error('invalid_file');
    if (file.size > 1024 * 1024) throw new Error('too_large');
    fill(await api('/api/inspect', { filename: file.name, markdown: await file.text() }));
    message('imported');
  } catch (error) {
    message(error.message, true);
  }
}
document.querySelector('#ui-language').addEventListener('change', (event) => {
  locale = event.target.value;
  translate();
  refresh().catch((error) => message(error.message, true));
});
document.querySelector('#new-post').addEventListener('click', () => {
  fill({});
  message('idle');
  fields.title.focus();
});
document.querySelector('#markdown-file').addEventListener('change', (event) => importFile(event.target.files[0]));
const drop = document.querySelector('#dropzone');
drop.addEventListener('dragover', (event) => {
  event.preventDefault();
  drop.classList.add('dragging');
});
drop.addEventListener('dragleave', () => drop.classList.remove('dragging'));
drop.addEventListener('drop', (event) => {
  event.preventDefault();
  drop.classList.remove('dragging');
  importFile(event.dataTransfer.files[0]);
});
document.querySelector('#save-draft').addEventListener('click', () => save('draft'));
form.addEventListener('submit', (event) => {
  event.preventDefault();
  save('publish');
});
document
  .querySelector('#refresh-posts')
  .addEventListener('click', () => refresh().catch((error) => message(error.message, true)));
document.querySelector('#sync-site').addEventListener('click', async () => {
  try {
    busy(true);
    await api('/api/sync', {});
    await poll();
  } catch (error) {
    message(error.message, true);
    busy(false);
  }
});
translate();
try {
  const session = await api('/api/session');
  token = session.token;
  defaultDate = session.today;
  fields.date.value = defaultDate;
  await refresh();
  const state = await api('/api/status');
  if (state.state === 'running') poll();
} catch (error) {
  message(error.message, true);
  busy(true);
}
