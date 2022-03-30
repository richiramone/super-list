interface IDefaultState {}

const defaultState: IDefaultState = {};

const ItemsReducer = (
  state: IDefaultState = defaultState,
  action: any
): IDefaultState => {
  return state;
};

export default ItemsReducer;
