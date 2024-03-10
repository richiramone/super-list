import { IItem } from '../interfaces'
import { createClient } from '@supabase/supabase-js';
import { sanitize } from '../utilities';

const DB_URL = import.meta.env.VITE_DATABASE_URL!;
const DB_KEY = import.meta.env.VITE_DATABASE_KEY!;

export const db = createClient(DB_URL, DB_KEY);

export const getItems = async () => {
  const { data } = await db
    .from('items')
    .select('*')
    .order('id', { ascending: false });

  return data;
};

export const insertItem = async (item: IItem) => {
  return await db
    .from('items')
    .insert({
      text: sanitize(item.text),
      author: item.author,
      hasQuestionMark: item.hasQuestionMark,
      category: item.category,
    });
};

export const updateItem = async (id: string, text: string, hasQuestionMark: boolean) => {
  return await db
    .from('items')
    .update({
      text: sanitize(text),
      hasQuestionMark: hasQuestionMark,
    })
    .eq('id', id);
};

export const updateItemHasQuestionMark = async (text: string, hasQuestionMark: boolean) => {
  const sanitizedText = sanitize(text);

  return await db
    .from('items')
    .update({
      text: sanitizedText,
      hasQuestionMark: hasQuestionMark,
    })
    .eq('text', sanitizedText);
};

export const deleteItem = async (id: string) => {
  return await db
    .from('items')
    .delete()
    .eq('id', id);
};

export const deleteItemByText = async (text: string) => {
  return await db
    .from('items')
    .delete()
    .eq('text', text);
};

export const emptyList = async () => {
  return await db
    .from('items')
    .delete()
    .gt('id', 0);
};
