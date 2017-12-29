import { Component, OnInit } from '@angular/core';
import {Apollo, ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  private categoryObs: ApolloQueryObservable<any>;
  private categorySub: Subscription;
  private allCategories: any;
  private categoryName: string;
  constructor(
    //private route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit() {
        // Fetch
        this.categoryObs = this.apollo.watchQuery({
          query: gql`query {
            allCategories { 
              id
              name
              description
              dishSet {
                id
                name
                description
                price
              }
            }
          }`,
          forceFetch: true,
        });
        this.categorySub = this.categoryObs.subscribe(({data, loading}) => {
          this.allCategories = data.allCategories;
          //this.currentUser = data.currentUser;
          //this.loading = loading;
        });
  }
  addCategory(name: string, description: string): void{
    this.apollo.mutate({
      mutation: gql`mutation createCategory($name: String!, $description: String!){
        createCategory(name: $name, description: $description){
          category{
            name
            description
          }
          ok
        }
      }`,
      variables: {
        name,
        description
      }
    }).subscribe(({data, loading})=>{
      this.refetch();
    });
  }

  editCategory(categoryId: string, name: string, description: string): void{
    this.apollo.mutate({
      mutation: gql`mutation editCategory($categoryId: String!, $name: String, $description: String){
        editCategory(id: $categoryId, name: $name, description: $description){
          category{
            name
            description
          }
          ok
        }
      }`,
      variables: {
        categoryId,
        name,
        description
      }
    }).subscribe(({data, loading})=>{
      this.refetch();
    });
  }

  deleteCategory(categoryId: string): void{
    this.apollo.mutate({
      mutation: gql`mutation deleteCategory($categoryId: String!){
        deleteCategory(id: $categoryId){
          category{
            name
            description
          }
          ok
        }
      }`,
      variables: {
        categoryId
      }
    }).subscribe(({data, loading})=>{
      this.refetch();
    });
  }
  addDish(categoryId: string, name: string, description: string, price: number): void{
    this.apollo.mutate({
      mutation: gql`mutation createDish($categoryId: String!, $name: String!, $description: String!, $price: Float!){
        createDish(categoryId: $categoryId, name: $name, description: $description, price: $price){
          dish{
            name
            description
            price
          }
          ok
        }
      }`,
      variables: {
        name,
        description,
        price,
        categoryId
      }
    }).subscribe(({data, loading})=>{
      this.refetch();
    });
  }

  editDish(dishId: string, name: string, description: string, price: number): void{
    this.apollo.mutate({
      mutation: gql`mutation editDish($dishId: String!, $name: String, $description: String, $price: Float){
        editDish(id: $dishId, name: $name, description: $description, price: $price){
          dish{
            name
            description
            price
          }
          ok
        }
      }`,
      variables: {
        dishId,
        name,
        description,
        price
      }
    }).subscribe(({data, loading})=>{
      this.refetch();
    });
  }

  deleteDish(dishId: string): void{
    this.apollo.mutate({
      mutation: gql`mutation deleteDish($dishId: String!){
        deleteDish(id: $dishId){
          dish{
            name
            description
            price
          }
          ok
        }
      }`,
      variables: {
        dishId
      },

    }).subscribe(({data, loading})=>{
      this.refetch();
    });
  }

  refetch(): void{
    this.categoryObs.refetch();
  }

}