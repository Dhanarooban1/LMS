import prisma from '../config/database.js';
import { apiResponse } from '../utils/apiResponse.js';



export const dashboardController = {
  getPendingReturns: async (req, res) => {
    try {
      const { date } = req.query;
      const targetDate = date ? new Date(date) : new Date();
     
  
      const pendingReturns = await prisma.issuance.findMany({
        where: {
          target_return_date: {
            equals: targetDate
          },
        },
        select: {
          issuance_date: true,
          target_return_date: true,
          member: {
            select: {
              mem_name: true
            }
          },
          book: {
            select: {
              book_name: true,
              book_publisher: true,
              collection: {
                select: {
                  collection_name: true
                }
              },
              category: {
                select: {
                  cat_name: true
                }
              }
            }
          }
        }
      });

    
  
      const formattedResponse = pendingReturns.map(issue => ({
        issuance_details: {
          issuance_date: issue.issuance_date,
          target_return_date: issue.target_return_date,
          days_overdue: Math.floor((targetDate - new Date(issue.target_return_date)) / (1000 * 60 * 60 * 24))
        },
        member: {
          name: issue.member.mem_name
        },
        book: {
          name: issue.book.book_name,
          publisher: issue.book.book_publisher
        },
        collection: {
          name: issue.book.collection.collection_name
        },
        category: {
          name: issue.book.category.cat_name
        }
      }));
      
      return apiResponse.success(res, formattedResponse);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }
};