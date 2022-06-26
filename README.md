# Slide Puzzle

Simple Slide Puzzle Game with p5.js library. At the beggining, i implemented using two-dim array. Then i realize that one-dim array could more efficent than two-dim. So i reimplemeted. You can still access the two-dim version on a different branch.

# Live Demo

[Live Demo](https://saliherdemk.github.io/Slider-Puzzle/)

# Resources

Shuffling was a huge problem. The easiest way to do that is making random legal moves. Thus, you don't worry about is puzzle solvable or not. I tried to shuffle through taking random tiles and change the indexes. Then i was going to check is puzzle solvable. Checking method that i used had some issues with NxP puzzles. For those who are interested:

https://developerslogblog.wordpress.com/2020/04/01/how-to-shuffle-an-slide-puzzle/
https://bost.ocks.org/mike/shuffle/
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
https://www.cs.mcgill.ca/~newborn/nxp_puzzleOct9.htm
