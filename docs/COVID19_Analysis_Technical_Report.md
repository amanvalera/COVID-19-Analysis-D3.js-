# COVID-19 Analysis — Technical Report

Github - amanvalera/F21DV_CW1 (github.com)

Video - https://youtu.be/sj8CFgmmpZ0



## Introduction4

## Design Consideration8

## User Guide9

## Developer Guide12

## Conclusion13

## Introduction

The COVID-19 pandemic has brought unprecedented challenges to public health and the global economy. As the world continues to grapple with the ongoing crisis, data visualization plays an important role in understanding the impact of the virus and shaping public policy. This web application presents a collection of interactive charts and maps that provide insights into the spread of COVID-19, vaccination rates, and public health policies across different countries. Through visualizing data from various sources, this application aims to enhance our understanding of the pandemic and help inform decision-making at individual and policy levels. The visualizations include a map showing the total number of COVID-19 cases worldwide, a chart displaying the stringency index over time, and charts showing the number of cases and deaths by country, the total number of cases and deaths, and the vaccination status of people. The data is collected from the World Health Organization Coronavirus Dashboard where the cases & deaths dataset is updated daily. The dataset can be used to analyze the effects of Covid-19 on different aspects and helps us identify which countries successfully tackled the outbreak and the ones that were struggling. The application is built using d3.js and provides a user-friendly interface for exploring and analyzing COVID-19 data.

## Requirement Checklist

Core Requirements needed to follow ALL

C1. Create a web-based application written in d3.js using version 7+. No PHP or server-side code should be used. JavaScript compiled from other languages (e.g. TypeScript) is not allowed. All the code submitted is in d3.js using version 7+. There was a large amount of resource that was available for us to refer to code in d3.js to create our visualization.

C2. Transitions and/or animations must be used to indicate what data are new, changing, or exiting.

There are transitions that are added in the code to show the transitioning for data. For eg. The transition in the area chart.

C3. Your user interface must be intuitive to use. The user interface is quite intuitive and has all the labels and instructions on the page to describe and justify the webpage.

For example:

C4. You must demonstrate consideration of accessibility when designing your user interface. The application has a nice contrast that is soothing to the eyes and the text can be read clearly and have kept the balance between the colors so that text is readable.Have used clear and concise text using complex language and technical jargon that could be difficult for some users to understand. As we should always keep your content clear, concise, and easy to read.

Descriptive text links have been used in lieu of generic text links such as “click here” as it accurately describes the content the user will be taken to.C5. Source code must be comprehensively documented

The source code is well documented and has all the comments to determine the action of the part of the code or to describe the code. Given below is an example which depicts what has just been described.

C6. You must explain your design and implementation choices in your report

I first started sketching the idea on a piece of paper then created the dashboard on Power BI to analyze the data by importing it from the git hub file location.

The idea was to understand what impact did Covid-19 have on different countries and gauge what they did to fight it. I have used d3.js, HTML, and CSS to implement the application. It required a lot of creative thinking, reflection, and testing to arrive at the final solution that is being presented in this report. The resources available at the library and the additional reading material published on Canvas were quite helpful as it contributed to the idea generation and implementation of the graphs and overall development.

C7. You must demonstrate your application with a submitted video

## Application Requirements

Your application must use the provided datasets and meet the following requirements.

A1. Your application should only require a single HTML page called index.html, that is within the root of the project. You are free to create as many additional CSS and JS files as you feel are necessary to support your application.

The visualizations are created on a single HTML page, However have used multiple JS files to make different types of visualization.

A2. All visualisations should be loaded on the single HTML page.

All the Visuals are loaded on the single HTML page called index.html using the <script> tag

A3. Use at least three different visualisation types.

Have used four types of visualization a map, area chart, clustered bar chart and multi-line chart to analyse the covid data in order to generate a story from the analysis.

A4. When  the  data  of  a  single  visualisation  is  updated,  all  axes  of  that  visualisation  should  also  update/rescale accordingly.

Implemented this using the map visual, when you click on any of the country on the map. The other charts will change their axes and then updates the chart.

A5. For  any  two  visualisations,  mousing  over  a  datapoint  in  one  visualisation  highlights  multiple  associated datapoints in another visualisation.

A6. There must be a bidirectional interaction between at least 3 of your visualisations — where interaction with one demonstrates a change in both of the others. This must be consistent such that interacting with any of the three visualisations in the similar manner will cause the others to react in the same way.

A7. Inclusion of a faceted selection interaction between two visualisations — where a mouseover or a click in one visualisation results in the data of a different visualisation being filtered.

Faceted selection interaction between two various charts with the map — where a click on a country on the map results in the data of a different visualisation being filtered line in other area and line charts.

A8. Use of a map visualisation which must interact with at least one visualisation.

When you interact with map plot by clicking on a country the other visualization come to the picture and are even updated when clicked on a different country.

A9. Use of scalar data over a map to indicate the distribution of scale over a geographical area — for example, use of circles of different sizes to indicate scales.

Have implemented  distribution of data over a scale of colors on the map with respect to the parameters.

A10. Use  of  cross-visualisation  brushing  where  dragging  a  rectangle  of  several  datapoints  in  one  visualisation highlights multiple associated datapoints in another visualisation

Have used brushing in the area chart and updated the chart to show the values in the brushed rectangle

A11. Use  of  an  appropriate  clustering  analysis  technique.  Note  that  a  scatter  plot  alone  is  not  a  viable  form  of clustering analysis.

## Design Consideration

In order to make a web application for COVID-19 data analysis user-friendly, educational, and accessible, it is crucial to take into account a number of elements. The following are some crucial design factors:

User Interface: The user interface should be simple to use and understand. The visualisations should be easy for users to obtain and comprehend how to use.

Responsive Design: As customers access the application from a range of platforms, it is crucial to make sure that it is responsive and functions properly on both mobile and desktop devices.

Accessibility: To essential that all users, including those with impairments, can access and utilise the application, it should be created with accessibility in mind.

Visual Design: The application's visual design has to be simple and effective.

By considering these design considerations, developers can create a web application that is both informative and user-friendly, providing valuable insights into the COVID-19 pandemic while also ensuring a positive user experience.

By creating visualization keeping the above things in mind in the direction of deriving something meaningful from the dataset to be able to use them as insights to understand what happened.

## User Guide

Here is a user guide for the COVID-19 data analysis web

Map Visualization: The first visualization is a map that displays the total number of cases for each country. You can click on any country to see more detailed information, such as the total number of cases, deaths, and vaccinations on the other visuals.

Stringency Index Chart: The second visualization is an area chart that displays the stringency index over time. You can hover over any point on the chart to see the stringency index value for that date.

Multi-Cases Line Chart: The third visualization is a multi-line chart that displays the total number of cases and deaths, as well as the number of new vaccinations, over time. You can hover over any point on the chart to see the number of cases, deaths, or vaccinations for that date.

Multi-Vaccination Line Chart: The fourth visualization is a multi-line chart that displays the percentage of the population that has been vaccinated over time. You can hover over any point on the chart to see the percentage of the population that has been vaccinated for that date.

GDP Line Chart: The fifth visualization is a multi-line chart that depicts the comparison between GPD of the country selected and new cases.

Clustered Bar Chart: The sixth visualization is a clustered bar chart that displays the number of cases and deaths for each country. You can hover over any bar on the chart to see the number of cases or deaths for that country.

## Developer Guide

If you are a developer looking to work on this COVID-19 analysis web application, here are some guidelines to get started:

Clone the repository:

Start by cloning the repository to your local machine using the command git clone <repository-url>. This will create a local copy of the project on your machine that you can work on.

Install dependencies:

This project uses several third-party libraries and frameworks such as CSS, and D3.js. Make sure to install these dependencies by running in the root directory of the project.

Explore the code structure:

Take some time to explore the code structure and understand how the different components of the application work together. The index.html file is the main HTML file that loads all the visualizations, and the JS directory contains all the JavaScript files for each visualization.

Customize the visualizations:

Once you have a good understanding of the code structure, you can start customizing the visualizations to suit your needs. Each visualization has its own JavaScript file that you can modify to change the data sources, colors, and other visual elements.

Test and debug:

As you make changes to the code, make sure to test the application and debug any issues that you encounter. You can use the developer tools in your browser to help with debugging.

Deploy the application:

Once you are satisfied with your changes, you can deploy the application to a web server or hosting service. Make sure to update the URLs in the index.html file to reflect the new location of the JavaScript files.

By following these guidelines, you should be able to customize and extend the COVID-19 analysis web application to suit your needs.

## Conclusion

This COVID-19 analysis web application provides a comprehensive and informative way to analyze the impact of the pandemic on a global scale. It is user-friendly and intuitive, and customizable, allowing developers to modify and extend the code to suit their needs. It is a valuable tool for policymakers, public health officials, and researchers working to combat the pandemic, with its rich and up-to-date data, easy-to-use interface, and flexible design.