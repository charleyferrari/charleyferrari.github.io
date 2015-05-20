# charleyferrari.github.io
# IS 608 Semester Project ReadMe
# Visualizing Company Visit Scores From the Bank of England

Below is a description of the necessary files to run this visualization. This isn't comprehensive of everything in the
folder. I kept my old work to give an idea of my thought process while attempting this assignment.

# Together.html

This is the main html file. On my github.io, the visualization is viewable at charleyferrari.github.io/together.html. This
file pulls in the relevant javascript libraries (**d3.min.js,** **nv.d3.min.js,** and the CSS file **nv.d3.css**), as well as
the javascript file that controls the visualization: **together.js.**

# Together.js

This is the main javascript file, which controls the drawing and revealing of the text and graphs as the user makes their way
through the visualization. 

# Source CSV Files

**econdata.csv**: This data came from the UK Office for National Statistics (http://www.ons.gov.uk/ons/index.html). Their
data is available in premade excel tables that I had to manually search through. Unfortunately, there was no automatic way to
parse this data directly from the source (it's what keeps my company's economic data business alive!) I copied, pasted, and
manipulated this data in excel. You can see some of the raw data in **economic data.xlsx.** This data is used to feed the
first economic data graph.

**agents.csv**: This data was created ultimately from the Bank of England source file: **agents.xlsx.** Taking the data tab
as a CSV, I was able to use **agentscreate.R** to shape the data into something workable for my visualization. Most notably,
I combined the future and current score columns, and added another column that defines the score type as current or future.
This raw data is used to feed the histogram and the google visualization. **Together.js** filters this data depending on
what the user selects for CurrentOrFuture, Score(title), and Sector.

**meancvs.csv**: This data was created using **meancvscreator.R**. Because the second meanCVS graph was always going to 
display the mean CVS score (by sector, or total), I thought it would be quicker to have this calculated beforehand. This 
is filtered by sec
