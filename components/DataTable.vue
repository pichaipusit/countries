<template>
  <el-input
    v-model="search"
    size="small"
    placeholder="Type to search"
    @focus="isSearching = true"
    @blur="isSearching = false"
  />
  <el-table :data="displayData" style="width: 100%">
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Name" prop="name" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="filterTableData.length"
    @current-change="(val) => (currentPage = val)"
    :current-page="currentPage"
    :page-size="pageSize"
  />
</template>

<script lang="ts" setup>
interface User {
  date: string;
  name: string;
  address: string;
}
const currentPage = ref(1);
const currentPageData = ref([]);
const pageSize = ref(10);
const isSearching = ref(false);

// const handleCurrentChange = (val) => {
//   currentPage.value = val;
// };
const search = ref("");
const filterTableData = computed(() => {
  return tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
const displayData = computed(() => {
  return calculateCurrentPageData();
});
const calculateCurrentPageData = () => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filterTableData.value.slice(startIndex, endIndex);
};

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "John",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Morgan",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Jessy",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style scoped>
:deep(.el-pager li.is-active) {
  background-color: var(--prim-color) !important;
}
</style>
